import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  source: {
    name: string;
  };
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2/',
  }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<
      NewsApiResponse,
      { category: string; page?: number }
    >({
      query: ({ category, page = 1 }) =>
        `top-headlines?country=us&category=${category}&page=${page}&pageSize=10&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
