type City = {
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

type TemperatureUnit = "imperial" | "metric";
