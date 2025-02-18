"use client";

import styles from "./DailyEvolution.module.css";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import UserLocationContext from "@/contexts/UserLocationContext";
import getUrl from "@/utils/getUrl";
import dayjs from "dayjs";
import classNames from "classnames";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/components/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";

type DailyEvolution = {
  DateTime: string,
  Temperature: {
    Unit: "F" | "C",
    UnitType: number,
    Value: number
  },
}

const WIDTH = 600;
const HEIGHT = 200;
const MARGIN = 20;
const INNER_HEIGHT = HEIGHT - MARGIN * 2;
const INNER_WIDTH = WIDTH - MARGIN * 2;

export default function DailyEvolution() {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState<boolean>(false);
  const [dailyEvolutions, setDailyEvolutions] = useState<Array<DailyEvolution>>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { city, temperatureUnit } = useContext(UserLocationContext);

  useIntersectionObserver({
    callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.unobserve(entry.target);
        } else {
          setAnimated(false);
        }
      });
    },
    ref
  });

  const getDailyEvolution = useCallback(async (city: City, temperatureUnit: TemperatureUnit) => {
    if (city === null) return;

    try {
      setIsLoading(true);
      setHasError(false);

      /* NOTE: 24 hour is on the paid plan */
      const url = getUrl(`/forecasts/v1/hourly/12hour/${city.Key}`, { metric: temperatureUnit === "metric" });
      const res = await fetch(url);

      if (!res.ok) throw new Error("Failed to fetch daily evolution data");

      const data = await res.json();

      setDailyEvolutions(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (city === null) return;

    getDailyEvolution(city, temperatureUnit);
  }, [city, temperatureUnit, getDailyEvolution]);

  const hydratedData = useMemo<Array<{ date: string; value: number }>>(() => {
    if (dailyEvolutions.length === 0) return [];

    return dailyEvolutions.filter((_, i) => i % 2 === 0).map((item) => ({
      date: item.DateTime,
      value: item.Temperature.Value
    }));
  }, [dailyEvolutions]);

  const dataPoints = useMemo<Array<[number, number]>>(() => {
    if (hydratedData.length === 0) return [];

    const values = hydratedData.map(({ value }) => value);

    const max = Math.max(...values);
    const min = Math.min(...values) - 5;
    const delta = max - min;
    const unit = (INNER_HEIGHT - MARGIN) / delta;

    return values.map((value, i) => {
      const x = MARGIN + ((INNER_WIDTH - 2 * MARGIN) / (hydratedData.length - 1) * i);
      const y = (INNER_HEIGHT - MARGIN) - (value - min) * unit;

      return [x, y];
    });
  }, [hydratedData]);

  const curvedPoints = useMemo<string>(() => {
    if (dataPoints.length === 0) return "";

    return dataPoints.reduce((acc, point, i, arr) => {
      if (i === 0) {
        const midX = (point[0] + arr[i + 1][0]) / 2;
        const midY = Math.max(point[1], arr[i + 1][1]);

        acc += `M${point.join(" ")} Q${midX}, ${midY} ${arr[i + 1].join(",")}`;
      } else if (i > 1) {
        acc += ` T${point.join(",")}`;
      }

      return acc;
    }, "");
  }, [dataPoints]);


  if (city === null) return null;

  return (
    <ErrorBoundary fallback={null}>
      <div className={styles.daily_evolution} ref={ref}>
        {isLoading ? (
          <Loader className={styles.loader} color="primary" />
        ) : hasError ? (
          <p className={styles.error}>Failed to fetch daily evolution data</p>
        ) : (
          <>
            <h2 className={styles.title}>Daily Evolution</h2>

            {dailyEvolutions.length > 0 && (
              <svg
                className={classNames(styles.line_graph, animated && styles.animate)}
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                width="100%"
              >
                <g transform={`translate(${MARGIN}, ${MARGIN})`}>
                  <path
                    d={curvedPoints}
                    fill="none"
                    stroke="#F48403"
                    strokeWidth="3"
                  />

                  {dataPoints.map(([x, y]) => (
                    <circle cx={x} cy={y} fill="#F48403" key={`${x}-${y}`} r="5" />
                  ))}

                  {hydratedData.map(({ date }, i, arr) => (
                    <text
                      className={styles.text}
                      fill="#ffffff"
                      fontSize="1em"
                      fontWeight={700}
                      key={date}
                      textAnchor="middle"
                      x={MARGIN + ((INNER_WIDTH - 2 * MARGIN) / (arr.length - 1) * i)}
                      y={INNER_HEIGHT + 10}
                    >
                      {dayjs(date).format("HH:mm")}
                    </text>
                  ))}
                </g>
              </svg>
            )}
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
