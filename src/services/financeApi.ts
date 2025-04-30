import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface AlphaVantageResponse {
  'Time Series (Daily)': {
    [date: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. adjusted close': string;
      '6. volume': string;
      '7. dividend amount': string;
      '8. split coefficient': string;
    };
  };
}

export const financeApi = createApi({
  reducerPath: 'financeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.alphavantage.co/query',
  }),
  endpoints: (builder) => ({
    getDailyStockData: builder.query<AlphaVantageResponse, string>({
      query: (symbol: string) =>
        `?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY}`,
    }),
  }),
});

export const { useGetDailyStockDataQuery } = financeApi;
