import { configureStore } from "@reduxjs/toolkit";
import { gamesApi } from "../services/gamesApi";
import { genresApi } from "../services/genresApi";
import gamesReducer from "../features/Games/gamesSlice";
export const store = configureStore({
  reducer: {
    [gamesApi.reducerPath]: gamesApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
    games: gamesReducer,
  },
});
