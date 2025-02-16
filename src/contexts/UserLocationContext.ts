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
  geoLocation: GeolocationCoordinates | null;
  city: City | null;
  setCity: Dispatch<SetStateAction<UserLocationContextType["city"]>>
}

const UserLocationContext = createContext<UserLocationContextType>({
  geoLocation: null,
  city: null,
  setCity: () => {},
});

export default UserLocationContext;
