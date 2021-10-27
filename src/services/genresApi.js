import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, RAPID_KEY } from "../constants";

const baseUrl = "https://rawg-video-games-database.p.rapidapi.com";

const rawgHeaders = {
  "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
  "x-rapidapi-key": RAPID_KEY,
};

const createRequest = (url) => ({ url, headers: rawgHeaders });

export const genresApi = createApi({
  reducerPath: "genresApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getGenresList: builder.query({
      query: () => createRequest(`/genres?key=${API_KEY}`),
    }),
  }),
});

export const { useGetGenresListQuery } = genresApi;
