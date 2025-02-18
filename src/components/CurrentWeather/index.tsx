"use client";

import { JSX, PropsWithoutRef, useCallback, useContext, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import styles from "./CurrentWeather.module.css";
import classNames from "classnames";
import getUrl from "@/utils/getUrl";
import UserLocationContext from "@/contexts/UserLocationContext";
import Loader from "@/components/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";

type CurrentWeatherProps = PropsWithoutRef<JSX.IntrinsicElements["div"]>;

export default function CurrentWeather({ className, ...props }: CurrentWeatherProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { city, setTemperatureUnit, temperatureUnit } = useContext(UserLocationContext);
  const [conditions, setConditions] = useState<CurrentConditionsRes | null>(null);

  const getCurrentConditions = useCallback(async (city: City) => {
    try {
      setIsLoading(true);

      const url = getUrl(`/currentconditions/v1/${city.Key}`);
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch current conditions");
      }

      const data: Array<CurrentConditionsRes> = await res.json();

      setConditions(data[0]);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!city) return;

    getCurrentConditions(city);
  }, [city, getCurrentConditions]);

  const temperature = useMemo(() => {
    if (!conditions) return null;

    return temperatureUnit === "metric"
      ? Math.round(conditions.Temperature.Metric.Value)
      : Math.round(conditions.Temperature.Imperial.Value);
  }, [conditions, temperatureUnit]);

  if (!city) return null;

  if (isLoading) {
    return (
      <div {...props} className={classNames(styles.current_weather, className)}>
        <Loader color="primary" data-testid="loader" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div {...props} className={classNames(styles.current_weather, className)}>
        <p className={styles.error} data-testid="error">Failed to fetch current conditions</p>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={null}>
      <div {...props} className={classNames(styles.current_weather, className)}>
        <div data-testid="current-weather-display">
          <h2 className={styles.title}>
            {`${city.AdministrativeArea.LocalizedName}, ${city.Country.ID}`}
          </h2>

          <div className={styles.degree_wrapper}>
            <p className={styles.degree}>{`${temperature}`}</p>

            <div className={styles.button_group}>
              <button
                className={classNames(temperatureUnit === "metric" && styles.is_active)}
                data-testid="celsius-button"
                disabled={temperatureUnit === "metric"}
                onClick={() => setTemperatureUnit("metric")}
              >
                °C
              </button>

              <button
                className={classNames(temperatureUnit === "imperial" && styles.is_active)}
                data-testid="fahrenheit-button"
                disabled={temperatureUnit === "imperial"}
                onClick={() => setTemperatureUnit("imperial")}
              >
                °F
              </button>
            </div>
          </div>

          {conditions !== null && (
            <p className={styles.summary}>{`${dayjs().format("dddd")}, ${conditions.WeatherText}`}</p>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
