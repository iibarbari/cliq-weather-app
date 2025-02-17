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

type CurrentConditionsRes = {
  Temperature: {
    Imperial: {
      Unit: string;
      UnitType: number;
      Value: number;
    };
    Metric: {
      Unit: string;
      UnitType: number;
      Value: number;
    };
  }
  WeatherText: string;
}

type TemperatureUnit = "imperial" | "metric";
