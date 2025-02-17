import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CitySearch from "@/components/CitySearch";
import UserLocationContext from "@/contexts/UserLocationContext";

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
  searchResults: [{}, {}]
};

const renderComponent = (contextProps = {}) => {
  return render(
    <UserLocationContext.Provider
      value={{
        city: null,
        setCity: jest.fn(),
        setTemperatureUnit: () => undefined,
        temperatureUnit: "metric",
        ...contextProps
      }}
    >
      <CitySearch />
    </UserLocationContext.Provider>
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

const mockSuccessfulSearch = (results = [MOCKS.city]) => {
  (fetch as jest.Mock).mockImplementation(() =>
    Promise.resolve({
      json: () => results,
      ok: true
    })
  );
};

const mockFailedSearch = () => {
  (fetch as jest.Mock).mockRejectedValue(new Error("Fetch error"));
};

const mockDelayedSearch = (delay = 500) => {
  (fetch as jest.Mock).mockImplementation(() =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ json: () => [], ok: true }), delay)
    )
  );
};

describe("CitySearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("error handling", () => {
    test("handles error state", async () => {
      mockFailedSearch();

      const { getByTestId } = renderComponent();
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
      const { getByTestId, queryByTestId } = renderComponent();

      const input = getByTestId("city-name-input");

      fireEvent.change(input, { target: { value: "Istanbul" } });

      await waitFor(() => {
        const dropdown = queryByTestId("city-search-results");

        expect(dropdown).toHaveClass("open");
      });
    });

    test("handles loading state", async () => {
      mockDelayedSearch(3000);

      const { getByTestId } = renderComponent();

      const input = getByTestId("city-name-input");

      fireEvent.change(input, { target: { value: "Amsterdam" } });

      await waitFor(() => {
        const dropdown = getByTestId("city-search-results");

        expect(dropdown).toHaveTextContent("Loading...");
      });
    });

    test("dropdown shows no data is there is no result", async () => {
      mockSuccessfulSearch([]);

      const { getByTestId } = renderComponent();

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
      const { getByTestId } = renderComponent();

      const input = getByTestId("city-name-input");

      fireEvent.change(input, { target: { value: "" } });

      await waitFor(() => {
        const dropdown = getByTestId("city-search-results");

        expect(dropdown).not.toHaveClass("open");
      });
    });

    test("search value resets after city is selected", async () => {
      mockSuccessfulSearch([MOCKS.city]);

      const { getByTestId } = renderComponent();

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
      mockSuccessfulSearch([MOCKS.city]);

      const setCity = jest.fn();

      const { getByTestId } = renderComponent({
        setCity
      });

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
        expect(setCity).toHaveBeenCalledWith(MOCKS.city);
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
      const { getByTestId } = renderComponent();

      const input = getByTestId("city-name-input");

      fireEvent.change(input, { target: { value: "Paris" } });

      expect(input).toHaveValue("Paris");
    });
  });
});

