import { createSlice } from "@reduxjs/toolkit";
import { getGameDetails, getGameList, getGenreList } from "./gamesThunks";

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    gameList: { loading: false },
    gameDetails: { loading: false },
    genres: { loading: false },
  },
  reducers: {
    addToGameList(state, action) {
      console.log({ state, action });
    },
  },
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
    builder.addCase(getGenreList.pending, (state, action) => {
      state.genres.loading = true;
    });

    builder.addCase(getGenreList.fulfilled, (state, action) => {
      const { genres } = state;
      const name = action?.payload?.params;
      const value = action?.payload?.results;
      genres[name] = value;

      state.genres.loading = false;
    });

    builder.addCase(getGenreList.rejected, (state, action) => {
      // state.genres.loading = false;
    });

    // ==================================================================
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

const { reducer, actions } = gamesSlice;

export const { addToGameList } = actions;
export default reducer;
