"use client";

import styles from "./CitySearch.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import getUrl from "@/utils/getUrl";
import classNames from "classnames";
import UserLocationContext from "@/contexts/UserLocationContext";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function CitySearch() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Array<City>>([]);
  const { setCity } = useContext(UserLocationContext);

  const getSearchResults = useCallback(async (search:string) => {
    try {
      setHasError(false);

      const url = getUrl(`/locations/v1/cities/autocomplete`, { q: search });

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await res.json();

      setResults(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setIsLoading(true);
    }

    const debounce = setTimeout(async () => {
      if (search) {
        await getSearchResults(search);
      } else {
        setResults([]);
        setHasError(false);
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [getSearchResults, search]);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className={styles.city_search}>
        <div className={styles.form_group}>
          <label htmlFor="city-name">City Name</label>

          <input
            autoComplete="off"
            data-testid="city-name-input"
            id="city-name"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter city name"
            type="text"
            value={search}
          />

          {hasError && (
            <p className={styles.error} data-testid="error-notice">
              Something unexpected happened. Please try again.
            </p>
          )}

          {!hasError && !isLoading && results.length === 0 && search.length > 0 && (
            <p className={styles.error} data-testid="error-notice">
              No results found
            </p>
          )}
        </div>

        <div
          className={classNames(styles.menu, ((results.length > 0 || isLoading) && !hasError) && styles.open)}
          data-testid="city-search-results"
        >
          {isLoading ? (
            <div className={styles.info}>Loading...</div>
          ) : (
            results.map((result, i) => (
              <button
                className={styles.item}
                data-testid={`city-search-result-${i}`}
                key={result.Key}
                onClick={() => {
                  setSearch("");
                  setResults([]);
                  setCity(result);
                }}
              >
                {`${result.AdministrativeArea.LocalizedName}, ${result.Country.ID}`}
              </button>
            ))
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
