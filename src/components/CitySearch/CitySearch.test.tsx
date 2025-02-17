import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CitySearch from "@/components/CitySearch";
import UserLocationContext from "@/contexts/UserLocationContext";

const mockCityData: City = {
  AdministrativeArea: {
    ID: "123",
    LocalizedName: "London"
  },
  Country: {
    ID: "123",
    LocalizedName: "United Kingdom"
  },
  Key: "123",
  LocalizedName: "London",
  Rank: 1,
  Type: "City",
  Version: 1,
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

describe("error handling", () => {
  test("handles error state", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

    const { getByTestId } = render(<CitySearch />);
    const input = getByTestId("city-name-input");

    fireEvent.change(input, { target: { value: "Oslo" } });

    await waitFor(() => {
      const errorNotice = getByTestId("error-notice");

      expect(errorNotice).toBeInTheDocument();
    });
  });
});

describe("functionality", () => {
  test("dropdown is visible after search", async () => {
    const { getByTestId, queryByTestId } = render(<CitySearch />);

    const input = getByTestId("city-name-input");

    fireEvent.change(input, { target: { value: "Istanbul" } });

    await waitFor(() => {
      const dropdown = queryByTestId("city-search-results");

      expect(dropdown).toHaveClass("open");
    });
  });

  test("handles loading state", async () => {
    (fetch as jest.Mock).mockImplementation(() =>
      new Promise((resolve) => setTimeout(() => resolve({ json: () => [], ok: true }), 500))
    );

    const { getByTestId, queryByTestId } = render(<CitySearch />);

    const input = getByTestId("city-name-input");

    fireEvent.change(input, { target: { value: "Amsterdam" } });

    await waitFor(() => {
      const dropdown = getByTestId("city-search-results");

      expect(dropdown).toHaveTextContent("Loading...");
    });

    await waitFor(() => {
      const dropdown = queryByTestId("city-search-results");

      expect(dropdown).not.toHaveTextContent("Loading...");
    });
  });

  test("dropdown shows no data is there is no result", async () => {
    (fetch as jest.Mock).mockImplementation(() =>
      new Promise((resolve) => resolve({ json: () => [], ok: true }))
    );

    const { getByTestId } = render(<CitySearch />);

    const input = getByTestId("city-name-input");
    fireEvent.change(input, { target: { value: "Barcelona" } });

    await waitFor(() => {
      const errorNotice = getByTestId("error-notice");

      expect(errorNotice).toBeInTheDocument();
      expect(errorNotice).toHaveTextContent(/No results/i);
    });

    await waitFor(() => {
      const dropdown = getByTestId("city-search-results");

      expect(dropdown).not.toHaveClass("open");
    });
  });

  test("dropdown is hidden after search is cleared", async () => {
    const { getByTestId } = render(<CitySearch />);

    const input = getByTestId("city-name-input");
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      const dropdown = getByTestId("city-search-results");

      expect(dropdown).not.toHaveClass("open");
    });
  });

  test("search value resets after city is selected", async () => {
    (fetch as jest.Mock).mockImplementation(() =>
      new Promise((resolve) => resolve({
        json: () => [mockCityData],
        ok: true
      }))
    );

    const { getByTestId } = render(<CitySearch />);

    const input = getByTestId("city-name-input");

    fireEvent.change(input, { target: { value: "London" } });

    const dropdown = getByTestId("city-search-results");

    await waitFor(() => {
      expect(dropdown).toHaveClass("open");
    });

    await waitFor(() => {
      const firstResult = getByTestId("city-search-result-0");

      fireEvent.click(firstResult);
    });

    await waitFor(() => {
      expect(input).toHaveValue("");
      expect(dropdown).not.toHaveClass("open");
    });
  });

  test("city is selected correctly", async () => {
    (fetch as jest.Mock).mockImplementation(() =>
      new Promise((resolve) => resolve({
        json: () => [mockCityData],
        ok: true
      }))
    );

    const setCity = jest.fn();

    const { getByTestId } = render((
      <UserLocationContext
        value={{
          city: null,
          isLoading: false,
          setCity,
          setTemperatureUnit: () => undefined,
          temperatureUnit: "metric"
        }}
      >
        <CitySearch />
      </UserLocationContext>
    ));

    const input = getByTestId("city-name-input");

    fireEvent.change(input, { target: { value: "London" } });

    const dropdown = getByTestId("city-search-results");

    await waitFor(() => {
      expect(dropdown).toHaveClass("open");
    });

    await waitFor(() => {
      const firstResult = getByTestId("city-search-result-0");

      fireEvent.click(firstResult);
    });

    await waitFor(() => {
      expect(setCity).toHaveBeenCalledWith(mockCityData);
    });
  });
});

describe("rendering", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<CitySearch />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe("user interaction", () => {
  test("search value updates correctly", async () => {
    const { getByTestId } = render(<CitySearch />);

    const input = getByTestId("city-name-input");

    fireEvent.change(input, { target: { value: "Paris" } });

    expect(input).toHaveValue("Paris");
  });
});


