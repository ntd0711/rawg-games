import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../features/Games/gamesSlice";
import usersReducer from "../features/Auth/usersSlice";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["authen/fulfilled", "logIn/fulfilled"],
      },
    }),
});
