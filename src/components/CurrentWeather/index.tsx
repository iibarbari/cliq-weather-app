"use client";

import { JSX, PropsWithoutRef, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./CurrentWeather.module.css";
import classNames from "classnames";
import getUrl from "@/utils/getUrl";
import UserLocationContext from "@/contexts/UserLocationContext";

type CurrentWeatherProps = PropsWithoutRef<JSX.IntrinsicElements["div"]>;

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

export default function CurrentWeather({ className, ...props }: CurrentWeatherProps) {
  const { city, temperatureUnit } = useContext(UserLocationContext);
  const [conditions, setConditions] = useState<CurrentConditionsRes | null>(null);

  useEffect(() => {
    if (city === null) return;

    async function getCurrentConditions() {
      if (city === null) return;

      try {
        const url = getUrl(`/currentconditions/v1/${city.Key}`);
        const res = await fetch(url);
        const data: Array<CurrentConditionsRes> = await res.json();

        setConditions(data[0]);
      } catch {
        return null;
      }
    }

    getCurrentConditions();
  }, [city]);

  if (!city) return null;
  if (!conditions) return null;

  const { Unit, Value } = temperatureUnit === "metric"
    ? conditions.Temperature.Metric
    : conditions.Temperature.Imperial;

  return (
    <div {...props} className={classNames(styles["current-weather"], className)}>
      <h2 className={styles.title}>
        {`${ city.AdministrativeArea.LocalizedName }, ${city.Country.ID}`}
      </h2>

      <div className={styles["degree-wrapper"]}>
        <p className={styles.degree}>{`${Value}°${Unit}`}</p>
      </div>

      <p className={styles.summary}>{`${dayjs().format("dddd")}, ${conditions.WeatherText}`}</p>
    </div>
  );
}
