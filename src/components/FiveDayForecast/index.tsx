"use client";

import { JSX, PropsWithoutRef, useCallback, useContext, useEffect, useState } from "react";
import getUrl from "@/utils/getUrl";
import dayjs from "dayjs";
import styles from "./FiveDayForecast.module.css";
import classNames from "classnames";
import Image from "next/image";
import UserLocationContext from "@/contexts/UserLocationContext";
import Loader from "@/components/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";

type FiveDayForecastProps = PropsWithoutRef<JSX.IntrinsicElements["div"]>;

export default function FiveDayForecast({ className, ...props }: FiveDayForecastProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { city, temperatureUnit } = useContext(UserLocationContext);
  const [dailyForecasts, setDailyForecasts] = useState<Array<Forecast>>([]);

  const getFiveDayForecast = useCallback(
    async (city: City, temperatureUnit: TemperatureUnit) => {
      try {
        if (!city) return;

        setIsLoading(true);
        setHasError(false);

        const url = getUrl(`/forecasts/v1/daily/5day/${city.Key}`, { metric: temperatureUnit === "metric" });
        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to fetch 5 day forecast");

        const data = await res.json();

        setDailyForecasts(data.DailyForecasts);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    if (!city) return;

    getFiveDayForecast(city, temperatureUnit);
  }, [city, temperatureUnit, getFiveDayForecast]);

  if (!city) return null;

  return (
    <ErrorBoundary fallback={null}>
      <div {...props} className={classNames(styles.five_day_forecast, className)}>
        {isLoading ? (
          <Loader className={styles.loader} color="primary" />
        ) : hasError ?
          <p className={styles.error}>Failed to fetch 5 day forecast</p>
          : (
            <>
              <h2 className={styles.title}>5 Day Forecast</h2>

              <div className={styles.wrapper}>
                {dailyForecasts.map(({ Date, Day: { Icon, IconPhrase }, Temperature: { Maximum, Minimum } }) => (
                  <div className={styles.card} key={Date}>
                    <p className={styles.date}>
                      {`${dayjs(Date).format("ddd").toUpperCase()} ${dayjs(Date).format("DD")}`}
                    </p>

                    <div className={styles.icon}>
                      <Image
                        alt={IconPhrase}
                        fill={true}
                        loading="lazy"
                        sizes="80px"
                        src={`https://developer.accuweather.com/sites/default/files/${String(Icon).padStart(2, "0")}-s.png`}
                      />
                    </div>

                    <div className={styles.degree}>
                      <p className={styles.high}>{`${Math.round(Maximum.Value)}°`}</p>
                      <p className={styles.low}>{`${Math.round(Minimum.Value)}°`}</p>
                    </div>

                    <p className={styles.summary}>{IconPhrase}</p>
                  </div>
                ))}
              </div>
            </>
          )}
      </div>
    </ErrorBoundary>
  );
}
