"use client";

import UserLocationContext, { UserLocationContextType } from "@/contexts/UserLocationContext";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import getUrl from "@/utils/getUrl";
import Container from "@/components/Container";
import styles from "./UserLocationContextProvider.module.css";
import Loader from "@/components/Loader";

export default function UserLocationContextProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<UserLocationContextType["city"] | null>(null);
  const [geoLocation, setGeoLocation] = useState<GeolocationCoordinates | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [permission, setPermission] = useState<PermissionState | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<UserLocationContextType["temperatureUnit"]>("metric");

  const getCityName = useCallback((async (latitude: number, longitude: number) => {
    try {
      setIsLoading(true);
      setHasError(false);

      const url = getUrl(`/locations/v1/cities/geoposition/search`, { q: `${latitude},${longitude}` });

      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch city name");

      const data = await response.json();

      setCity(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }), []);

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => setPermission(result.state))
  }, []);

  useEffect(() => {
    if (permission === null) return;

    if (permission === "granted" || permission === "prompt") {
      navigator.geolocation.getCurrentPosition(
        (position) => setGeoLocation(position.coords),
        (error) => console.error(error)
      );
    }
  }, [permission]);

  useEffect(() => {
    if (geoLocation === null) return;

    const { latitude, longitude } = geoLocation;

    getCityName(latitude, longitude);
  }, [geoLocation]);

  const values = useMemo<UserLocationContextType>(() => ({
    city,
    setCity,
    setTemperatureUnit,
    temperatureUnit,
  }), [city, temperatureUnit]);

  return (
    <UserLocationContext.Provider value={values}>
      {isLoading ? (
        <Container className={styles.loader_wrapper}>
          <Loader />
        </Container>
      ) : hasError ? (
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
