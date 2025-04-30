import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface WeatherResponse {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<WeatherResponse, string>({
      query: (city: string) =>
        `weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`,
    }),
  }),
});

export const { useGetWeatherByCityQuery } = weatherApi;
