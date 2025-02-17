"use client";

import UserLocationContext, { UserLocationContextType } from "@/contexts/UserLocationContext";
import { ReactNode, useEffect, useMemo, useState } from "react";
import getUrl from "@/utils/getUrl";
import Container from "@/components/Container";
import styles from "./UserLocationContextProvider.module.css";

export default function UserLocationContextProvider({ children }: { children: ReactNode }) {
  const [permission, setPermission] = useState<PermissionState | null>(null);
  const [geoLocation, setGeoLocation] = useState<GeolocationCoordinates | null>(null);
  const [city, setCity] = useState<UserLocationContextType["city"] | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<UserLocationContextType["temperatureUnit"]>("metric");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    navigator.permissions.query({ name: "geolocation" })
      .then((result) => {
        setPermission(result.state);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (permission === null) return;

    if (permission === "granted" || permission === "prompt") {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoLocation(position.coords);
      });
    }
  }, [permission]);

  useEffect(() => {
    if (geoLocation === null) return;

    const { latitude, longitude } = geoLocation;

    async function getCityName(latitude: number, longitude: number) {
      setIsLoading(true);
      setHasError(false);

      try {
        const url = getUrl(`/locations/v1/cities/geoposition/search`, { q: `${latitude},${longitude}` });

        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to fetch city name");

        return await response.json();
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getCityName(latitude, longitude).then((city) => setCity(city));
  }, [geoLocation]);

  const values = useMemo<UserLocationContextType>(() => ({
    city,
    isLoading,
    setCity,
    setTemperatureUnit,
    temperatureUnit,
  }), [city, isLoading, temperatureUnit]);

  return (
    <UserLocationContext.Provider value={values}>
      {hasError ? (
        <Container className={styles.error_wrapper}>
          <h1 className={styles.title}>Something went wrong.</h1>

          <p>
            AccuWeather API is not available at the moment. Please contact with
            {" "}
            <a href="mailto:ilknur@sari.me">ilknur@sari.me</a>
            {" "}
            or try again later.
          </p>
        </Container>
      ) : children}
    </UserLocationContext.Provider>
  );
}
