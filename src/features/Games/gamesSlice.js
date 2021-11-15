import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import queryString from "query-string";
import { gamesApi } from "../../api/gamesApi";
import { genresApi } from "../../api/genresApi";

export const getGameList = createAsyncThunk("gameList", async (payload) => {
  if (payload?.page === 1) return;
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
    // return isRejectedWithValue(error.response);
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

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    gameList: { loading: false },
    gameDetails: { loading: false },
    genreList: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGameList.pending, (state, action) => {
      state.gameList.loading = true;
    });
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

      gameList.loading = false;
    });
    builder.addCase(getGameList.rejected, (state, action) => {
      state.gameList.loading = false;
      console.log(action.payload);
    });

    // ==========================================================================
    builder.addCase(getGenreList.fulfilled, (state, action) => {
      const { genreList } = state;
      const name = action?.payload?.params;
      const value = action?.payload?.results;
      genreList[name] = value;
    });

    builder.addCase(getGameDetails.pending, (state, action) => {
      state.gameDetails.loading = true;
    });

    builder.addCase(getGameDetails.fulfilled, (state, action) => {
      const { slug, data, screenShots } = action.payload;
      state.gameDetails[slug] = {};
      state.gameDetails[slug].data = data;
      state.gameDetails[slug].screenShots = screenShots;

      state.gameDetails.loading = false;
    });
    builder.addCase(getGameDetails.rejected, (state, action) => {
      state.gameDetails.loading = false;
      console.log(action.payload);
    });
  },
});

const { reducer } = gamesSlice;

export default reducer;
