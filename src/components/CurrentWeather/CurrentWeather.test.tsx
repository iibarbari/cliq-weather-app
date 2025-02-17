import { render, waitFor } from "@testing-library/react";
import CurrentWeather from "@/components/CurrentWeather/index";
import UserLocationContext from "@/contexts/UserLocationContext";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

const MOCKS = {
  city: {
    AdministrativeArea: { ID: "123", LocalizedName: "London" },
    Country: { ID: "123", LocalizedName: "United Kingdom" },
    Key: "123",
    LocalizedName: "London",
    Rank: 1,
    Type: "City",
    Version: 1
  } as City,
  weather: {
    Temperature: {
      Imperial: { Unit: "F", UnitType: 18, Value: 68 },
      Metric: { Unit: "C", UnitType: 17, Value: 20 }
    },
    WeatherText: "Cloudy"
  } as CurrentConditionsRes
};

const renderComponent = (props = {}) => {
  return render(
    <UserLocationContext.Provider
      value={{
        city: MOCKS.city,
        setCity: jest.fn(),
        setTemperatureUnit: jest.fn(),
        temperatureUnit: "metric",
        ...props
      }}
    >
      <CurrentWeather />
    </UserLocationContext.Provider>
  );
};

const mockSuccessfulFetch = () => {
  (fetch as jest.Mock).mockImplementation(() =>
    Promise.resolve({
      json: () => [MOCKS.weather],
      ok: true
    })
  );
};

const mockFailedFetch = () => {
  (fetch as jest.Mock).mockRejectedValue(new Error("Fetch failed"));
};

const mockDelayedFetch = (delay = 1000) => {
  (fetch as jest.Mock).mockImplementation(() =>
    new Promise((resolve) =>
      setTimeout(() =>
          resolve({ json: () => [MOCKS.weather], ok: true }),
        delay
      )
    )
  );
};


beforeEach(() => {
  (global.fetch as jest.Mock) = jest.fn(() => {
    return Promise.resolve({
      formData: () => Promise.resolve({}),
      json: () => Promise.resolve([]),
      text: () => Promise.resolve("result"),
    });
  }) as jest.Mock;
});

describe("CurrentWeather", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("user interactions", () => {
    it("user can change the temperature unit", async () => {
      mockSuccessfulFetch();

      const setTemperatureUnit = jest.fn();

      const { getByTestId } = renderComponent({ setTemperatureUnit });

      await waitFor(() => getByTestId("celsius-button"));

      const celciusButton = getByTestId("celsius-button");

      expect(celciusButton).toBeDisabled();

      const fahrenheitButton = getByTestId("fahrenheit-button");

      await userEvent.click(fahrenheitButton);

      expect(setTemperatureUnit).toHaveBeenCalledWith("imperial");
    });
  });


  describe("functionality", () => {
    it("should display loading state", async () => {
      mockDelayedFetch();

      const { getByTestId } = renderComponent();

      await waitFor(() => getByTestId("loader"));

      const loader = getByTestId("loader");

      expect(loader).toBeInTheDocument();
    });

    it("should display error state", async () => {
      mockFailedFetch();
      const { getByTestId } = renderComponent();

      await waitFor(() => {
        expect(getByTestId("error")).toBeInTheDocument();
      });
    });

    it("should display right data", async () => {
      mockSuccessfulFetch();
      const { getByTestId, getByText } = renderComponent();

      await waitFor(() => {
        const display = getByTestId("current-weather-display");
        expect(display).toBeInTheDocument();
        expect(getByText("20")).toBeInTheDocument();
      });
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      const { asFragment } = render(<CurrentWeather />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
