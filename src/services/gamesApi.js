import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, RAPID_KEY } from "../constants";

const baseUrl = "https://rawg-video-games-database.p.rapidapi.com";

const rawgHeaders = {
  "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
  "x-rapidapi-key": RAPID_KEY,
};

const createRequest = (url, params) => ({
  url,
  headers: rawgHeaders,
  params,
});

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllGames: builder.query({
      query: (params) => createRequest(`/games?&key=${API_KEY}`, params),
    }),
  }),
});

export const { useGetAllGamesQuery } = gamesApi;
