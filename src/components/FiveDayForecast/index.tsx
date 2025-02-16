import { JSX, PropsWithoutRef } from 'react';
import getUrl from '@/utils/getUrl';
import dayjs from 'dayjs';
import styles from "./FiveDayForcast.module.css";
import classNames from 'classnames';
import Image from 'next/image';

type FiveDayForecastProps = PropsWithoutRef<JSX.IntrinsicElements["div"]> & {
  cityKey: string;
  cityName: string;
  countryCode: string;
  temperatureUnit: "imperial" | "metric";
};

type Forecast = {
  Date: string;
  Day: { Icon: number, IconPhrase: string, HasPrecipitation: boolean };
  EpochDate: number;
  Link: string;
  MobileLink: "http://www.accuweather.com/en/tr/saimekadin/1288697/daily-weather-forecast/1288697?unit=c&lang=en-us"
  Night: { Icon: number, IconPhrase: string, HasPrecipitation: boolean }
  Sources: Array<string>;
  Temperature: {
    Maximum: { Value: number, Unit: string, UnitType: number };
    Minimum: { Value: number, Unit: string, UnitType: number };
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

export default async function FiveDayForecast({
  className,
  cityKey,
  temperatureUnit,
  ...props
}: FiveDayForecastProps) {
  const url = getUrl(`/forecasts/v1/daily/5day/${cityKey}`, { metric: temperatureUnit === "metric" });
  const res = await fetch(url);
  const data: FiveDayForecast = await res.json();

  const { DailyForecasts } = data;

  return (
    <div {...props} className={classNames(styles["five-day-forecast"], className)}>
      <h2 className={styles.title}>5 Day Forecast</h2>

      <div className={styles.wrapper}>
        {DailyForecasts.map(({ Date, Day: { Icon, IconPhrase }, Temperature: { Maximum, Minimum } }) => (
          <div className={styles.card} key={Date}>
            <p className={styles.date}>{`${dayjs(Date).format("ddd").toUpperCase()} ${dayjs(Date).format("DD")}`}</p>

            <div className={styles.icon}>
              <Image
                src={`https://developer.accuweather.com/sites/default/files/${String(Icon).padStart(2, '0')}-s.png`}
                alt={IconPhrase}
                fill={true}
                loading="lazy"
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
