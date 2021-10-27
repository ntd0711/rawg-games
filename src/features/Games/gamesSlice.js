import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { gamesApi } from "../../api/gamesApi";
import { genresApi } from "../../api/genresApi";
import queryString from "query-string";
import { useSelector } from "react-redux";
// const gameList = [];

export const getGameList = createAsyncThunk("gameList", async (payload) => {
  const response = await gamesApi.getAll(payload);
  const { results, next } = response;

  return {
    params: queryString.stringify(payload),
    results,
  };
});

export const getGenreList = createAsyncThunk("genreList", async () => {
  const response = await genresApi.getAll();
  const { results, next } = response;

  return results;
});

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    gameList: [],
    genreList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGameList.fulfilled, (state, action) => {
      state.gameList.push(action.payload);
    });

    builder.addCase(getGenreList.fulfilled, (state, action) => {
      state.genreList = action.payload;
    });
  },
});

const { reducer } = gamesSlice;

export default reducer;
