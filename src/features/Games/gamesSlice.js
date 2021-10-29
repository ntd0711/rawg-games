import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { gamesApi } from "../../api/gamesApi";
import { genresApi } from "../../api/genresApi";
import queryString from "query-string";

export const getGameList = createAsyncThunk("gameList", async (payload) => {
  if (payload?.page === 1) return;

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
});

export const getGenreList = createAsyncThunk("genreList", async () => {
  const response = await genresApi.getAll();

  const { results } = response;

  return {
    params: "genreList",
    results,
  };
});

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    gameList: {},
    genreList: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGameList.fulfilled, (state, action) => {
      if (!action) return;
      const { gameList } = state;
      const newKey = action?.payload?.params;
      const value = action?.payload?.results;
      const page = action?.payload?.page;

      if (!newKey) return;

      if (newKey in gameList) {
        const prevData = gameList[newKey].data;
        gameList[newKey].data = [...prevData, ...value];
        gameList[newKey].page = page;
      } else {
        gameList[newKey] = {};
        gameList[newKey].data = value;
        gameList[newKey].page = page;
      }
    });

    builder.addCase(getGenreList.fulfilled, (state, action) => {
      const { genreList } = state;
      const name = action?.payload?.params;
      const value = action?.payload?.results;
      genreList[name] = value;
    });
  },
});

const { reducer } = gamesSlice;

export default reducer;
