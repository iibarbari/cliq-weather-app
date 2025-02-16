"use client";

import { JSX, PropsWithoutRef, useContext, useEffect, useState } from "react";
import getUrl from "@/utils/getUrl";
import dayjs from "dayjs";
import styles from "./FiveDayForecast.module.css";
import classNames from "classnames";
import Image from "next/image";
import UserLocationContext from "@/contexts/UserLocationContext";

type FiveDayForecastProps = PropsWithoutRef<JSX.IntrinsicElements["div"]>;

type Forecast = {
  Date: string;
  Day: { HasPrecipitation: boolean, Icon: number, IconPhrase: string };
  EpochDate: number;
  Link: string;
  MobileLink: "http://www.accuweather.com/en/tr/saimekadin/1288697/daily-weather-forecast/1288697?unit=c&lang=en-us"
  Night: { HasPrecipitation: boolean, Icon: number, IconPhrase: string }
  Sources: Array<string>;
  Temperature: {
    Maximum: { Unit: string, UnitType: number, Value: number };
    Minimum: { Unit: string, UnitType: number, Value: number };
  }
}

type FiveDayForecast = {
  DailyForecasts: [Forecast, Forecast, Forecast, Forecast, Forecast];
  Headline: {
    Category: string;
    EffectiveDate: string;
    EffectiveEpochDate: number;
    EndDate: string;
    EndEpochDate: number;
    Link: string;
    MobileLink: string;
    Severity: number;
    Text: string;
  }
}

export default function FiveDayForecast({ className, ...props }: FiveDayForecastProps) {
  const { city, temperatureUnit } = useContext(UserLocationContext);
  const [dailyForecasts, setDailyForecasts] = useState<Array<Forecast>>([]);

  useEffect(() => {
    async function getFiveDayForecast() {
      if (!city) return;

      const url = getUrl(`/forecasts/v1/daily/5day/${city.Key}`, { metric: temperatureUnit === "metric" });
      const res = await fetch(url);
      const data: FiveDayForecast = await res.json();

      setDailyForecasts(data.DailyForecasts);
    }

    getFiveDayForecast();
  }, [city, temperatureUnit]);

  if (!city) return null;

  return (
    <div {...props} className={classNames(styles.five_day_forecast, className)}>
      <h2 className={styles.title}>5 Day Forecast</h2>

      <div className={styles.wrapper}>
        {dailyForecasts.map(({ Date, Day: { Icon, IconPhrase }, Temperature: { Maximum, Minimum } }) => (
          <div className={styles.card} key={Date}>
            <p className={styles.date}>{`${dayjs(Date).format("ddd").toUpperCase()} ${dayjs(Date).format("DD")}`}</p>

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
    </div>
  );
}
