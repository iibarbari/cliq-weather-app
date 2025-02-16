"use client";

import UserLocationContext, { City, UserLocationContextType } from "@/contexts/UserLocationContext";
import { ReactNode, useEffect, useMemo, useState } from 'react';

export default function UserLocationContextProvider({ children }: { children: ReactNode }) {
  const [permission, setPermission] = useState<PermissionState | null>(null);
  const [geoLocation, setGeoLocation] = useState<GeolocationCoordinates | null>(null);
  const [city, setCity] = useState<UserLocationContextType["city"] | null>(null);

  console.log({ city });

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      setPermission(result.state);
    });
  }, []);

  useEffect(() => {
    if (permission === null) return;

    if (permission === 'granted' || permission === 'prompt') {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoLocation(position.coords);
      });
    }
  }, [permission]);

  useEffect(() => {
    if (geoLocation === null) return;

    const { latitude, longitude } = geoLocation;

    async function getCityName(latitude: number, longitude: number) {
      const apiKey = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY;

      if (!apiKey) throw new Error('API key is required');

      const searchParams = new URLSearchParams({
        apikey: apiKey,
        q: `${latitude},${longitude}`,
      });

      const url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?${searchParams.toString()}`;

      try {
        const response = await fetch(url);
        const data: City = await response.json();

        return data;
      } catch {
        throw new Error('Failed to fetch city name');
      }
    }

    getCityName(latitude, longitude).then((city) => setCity(city));
  }, [geoLocation]);

  const values = useMemo<UserLocationContextType>(() => ({
    geoLocation,
    city,
    setCity,
  }), [geoLocation]);

  return (
    <UserLocationContext.Provider value={values}>
      {children}
    </UserLocationContext.Provider>
  );
}
