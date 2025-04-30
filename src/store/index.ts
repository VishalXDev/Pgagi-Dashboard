import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "../services/weatherApi";
import { newsApi } from "../services/newsApi";
import { financeApi } from "../services/financeApi";

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [financeApi.reducerPath]: financeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      weatherApi.middleware,
      newsApi.middleware,
      financeApi.middleware
    ),
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
