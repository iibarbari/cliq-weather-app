import { JSX, PropsWithoutRef } from 'react';
import dayjs from 'dayjs';
import styles from './CurrentWeather.module.css';
import classNames from 'classnames';
import getUrl from '@/utils/getUrl';

type CurrentWeatherProps = PropsWithoutRef<JSX.IntrinsicElements["div"]> & {
  cityKey: string;
  cityName: string;
  countryCode: string;
  temperatureUnit: "imperial" | "metric";
};

type CurrentConditionsRes = {
  Temperature: {
    Imperial: {
      Unit: string;
      UnitType: number;
      Value: number;
    };
    Metric: {
      Unit: string;
      UnitType: number;
      Value: number;
    };
  }
  WeatherText: string;
}

export default async function CurrentWeather({
  className,
  cityKey,
  cityName,
  countryCode,
  temperatureUnit,
  ...props
}: CurrentWeatherProps) {
  const url = getUrl(`/currentconditions/v1/${cityKey}`);
  const res = await fetch(url);
  const data: Array<CurrentConditionsRes> = await res.json();
  const [currentConditions] = data;

  if (!currentConditions) return null;

  const { Value, Unit } = temperatureUnit === "metric"
    ? currentConditions.Temperature.Metric
    : currentConditions.Temperature.Imperial;

  return (
    <div {...props} className={classNames(styles["current-weather"], className)}>
      <h2 className={styles.title}>
        {cityName}, {countryCode}
      </h2>

      <div className={styles["degree-wrapper"]}>
        <p className={styles.degree}>{`${Value}°${Unit}`}</p>
      </div>

      <p className={styles.summary}>{`${dayjs().format("dddd")}, ${currentConditions.WeatherText}`}</p>
    </div>
  );
}
