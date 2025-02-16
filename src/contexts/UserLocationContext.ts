import { createContext, Dispatch, SetStateAction } from "react";

export type City = {
  AdministrativeArea: {
    ID: string,
    LocalizedName: string
  }
  Country: {
    ID: string,
    LocalizedName: string
  },
  Key: string,
  LocalizedName: string,
  Rank: number,
  Type: "City",
  Version: number,
}

export type UserLocationContextType = {
  city: City | null;
  setCity: Dispatch<SetStateAction<UserLocationContextType["city"]>>
  setTemperatureUnit: Dispatch<SetStateAction<UserLocationContextType["temperatureUnit"]>>;
  temperatureUnit: "imperial" | "metric";
}

const UserLocationContext = createContext<UserLocationContextType>({
  city: null,
  setCity: () => {},
  setTemperatureUnit: () => {},
  temperatureUnit: "metric",
});

export default UserLocationContext;
