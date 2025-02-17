import { createContext, Dispatch, SetStateAction } from "react";

export type UserLocationContextType = {
  city: City | null;
  isLoading: boolean;
  setCity: Dispatch<SetStateAction<UserLocationContextType["city"]>>
  setTemperatureUnit: Dispatch<SetStateAction<UserLocationContextType["temperatureUnit"]>>;
  temperatureUnit: TemperatureUnit;
}

const UserLocationContext = createContext<UserLocationContextType>({
  city: null,
  isLoading: false,
  setCity: () => {},
  setTemperatureUnit: () => {},
  temperatureUnit: "metric",
});

export default UserLocationContext;
