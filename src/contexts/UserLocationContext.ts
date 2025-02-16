import { createContext, Dispatch, SetStateAction } from 'react';

export type City = {
  "Version": number,
  "Key": string,
  "Type": "City",
  "Rank": number,
  "LocalizedName": string,
  "Country": {
    "ID": string,
    "LocalizedName": string
  },
  "AdministrativeArea": {
    "ID": string,
    "LocalizedName": string
  }
}

export type UserLocationContextType = {
  city: City | null;
  setCity: Dispatch<SetStateAction<UserLocationContextType["city"]>>
  temperatureUnit: "imperial" | "metric";
  setTemperatureUnit: Dispatch<SetStateAction<UserLocationContextType["temperatureUnit"]>>;
}

const UserLocationContext = createContext<UserLocationContextType>({
  city: null,
  setCity: () => {},
  temperatureUnit: "metric",
  setTemperatureUnit: () => {},
});

export default UserLocationContext;
