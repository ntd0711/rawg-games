import { createAsyncThunk } from "@reduxjs/toolkit";
import queryString from "query-string";
import { gamesApi } from "../../api/gamesApi";
import { genresApi } from "../../api/genresApi";

export const getGameList = createAsyncThunk("gameList", async (payload) => {
  try {
    const response = await gamesApi.getAll(payload);
    const { results } = response;

    const page = payload?.page || 1;
    if (payload?.page) delete payload?.page;
    const params = queryString.stringify(payload);

    return {
      params,
      results,
      page,
    };
  } catch (error) {
    console.log(error);
  }
});

export const getGameDetails = createAsyncThunk("gameDetails", async (slug) => {
  try {
    const data = await gamesApi.getById(slug);
    const screenShots = await gamesApi.getScreenShots(slug);
    return { slug, data, screenShots };
  } catch (error) {
    console.log(error);
  }
});

export const getGenreList = createAsyncThunk("genreList", async () => {
  const response = await genresApi.getAll();

  const { results } = response;

  return {
    params: "genreList",
    results,
  };
});
