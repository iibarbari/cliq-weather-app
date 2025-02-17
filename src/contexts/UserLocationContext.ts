import { createContext, Dispatch, SetStateAction } from "react";

export type UserLocationContextType = {
  city: City | null;
  setCity: Dispatch<SetStateAction<UserLocationContextType["city"]>>
  setTemperatureUnit: Dispatch<SetStateAction<UserLocationContextType["temperatureUnit"]>>;
  temperatureUnit: TemperatureUnit;
}

const UserLocationContext = createContext<UserLocationContextType>({
  city: null,
  setCity: () => {},
  setTemperatureUnit: () => {},
  temperatureUnit: "metric",
});

export default UserLocationContext;
