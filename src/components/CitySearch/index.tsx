"use client";

import styles from './CitySearch.module.css';
import { useContext, useEffect, useState } from 'react';
import getUrl from '@/utils/getUrl';
import classNames from 'classnames';
import UserLocationContext, { City } from '@/contexts/UserLocationContext';

export default function CitySearch() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Array<City>>([]);
  const { setCity } = useContext(UserLocationContext);

  useEffect(() => {
    async function getSearchResults() {
      try {
        setIsLoading(true);
        setHasError(false);

        const url = getUrl(`/locations/v1/cities/autocomplete`, { q: search });

        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to fetch search results");

        const data = await res.json();

        setResults(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    const debounce = setTimeout(async () => {
      if (search) {
        await getSearchResults();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <div className={styles.city_search}>
      <div className={styles.form_group}>
        <label htmlFor="city-name">City Name</label>

        <input
          type="text"
          id="city-name"
          placeholder="Enter city name"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          autoComplete="off"
        />

        {hasError && (
          <p className={styles.error}>
            Something unexpected happened. Please try again.
          </p>
        )}
      </div>

      <div className={classNames(styles.menu, (results.length > 0 || isLoading) && styles.open)}>
        {isLoading ? (
          <div className={styles.item}>Loading...</div>
        ) : (
          results.map((result) => (
            <button
              className={styles.item}
              key={result.Key}
              onClick={() => {
                setSearch("");
                setResults([]);
                setCity(result);
              }}
            >
              {result.AdministrativeArea.LocalizedName}, {result.Country.ID}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
