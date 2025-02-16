"use client";

import UserLocationContext, { UserLocationContextType } from "@/contexts/UserLocationContext";
import { ReactNode, useEffect, useMemo, useState } from 'react';

type GeolocationResponse = {
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  },
  Key: string;
}

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
    const data: GeolocationResponse = await response.json();

    return {
      name: data.AdministrativeArea.LocalizedName,
      key: data.Key,
    };
  } catch {
    throw new Error('Failed to fetch city name');
  }
}

type CurrentConditionResponse = {
  LocalizedName: string;
  Key: string;
}

export default function UserLocationContextProvider({ children }: { children: ReactNode }) {
  const [permission, setPermission] = useState<PermissionState | null>(null);
  const [geoLocation, setGeoLocation] = useState<GeolocationCoordinates | null>(null);
  const [city, setCity] = useState<UserLocationContextType["city"] | null>(null);

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

    getCityName(latitude, longitude).then((city) => setCity(city));
  }, [geoLocation]);

  const values = useMemo<UserLocationContextType>(() => ({
    geoLocation,
    city,
  }), [geoLocation]);

  return (
    <UserLocationContext.Provider value={values}>
      {children}
    </UserLocationContext.Provider>
  );
}
