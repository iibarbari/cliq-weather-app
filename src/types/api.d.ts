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

type Forecast = {
  Date: string;
  Day: { HasPrecipitation: boolean, Icon: number, IconPhrase: string };
  EpochDate: number;
  Link: string;
  MobileLink: string;
  Night: { HasPrecipitation: boolean, Icon: number, IconPhrase: string }
  Sources: Array<string>;
  Temperature: {
    Maximum: { Unit: string, UnitType: number, Value: number };
    Minimum: { Unit: string, UnitType: number, Value: number };
  }
}

type FiveDayForecastRes = {
  DailyForecasts: [Forecast, Forecast, Forecast, Forecast, Forecast];
  Headline: {
    Category: string;
    EffectiveDate: string;
    EffectiveEpochDate: number;
    EndDate: string;
    EndEpochDate: number;
    Link: string;
    MobileLink: string;
    Severity: number;
    Text: string;
  }
}
