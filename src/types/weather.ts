export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface ForecastDay {
  dt: number;
  temp: {
    day: number;
  };
  humidity: number;
  wind_speed: number;
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface ForecastResponse {
  daily: ForecastDay[];
}
