import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loadedAuth: false,
  likes: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: initialState,
  },
  reducers: {
    updateUsername(state, action) {
      state.users.currentUser = {
        ...state.currentUser,
        displayName: action.payload,
      };
    },
    updateUserProfileSuccess(state, action) {
      state.users.currentUser = {
        ...state.users.currentUser,
        ...action.payload,
      };
    },
    setLoadingAuth(state, action) {
      state.users.loadedAuth = action.payload;
    },
    loginSuccess(state, action) {
      state.users.currentUser = action.payload;
    },
    clearUser(state, action) {
      state.users = initialState;
    },
    userToggleLike(state, action) {
      const { id, game } = action.payload;
      state.users.likes[id] = game;
    },
    updateUserLiked(state, action) {
      const liked = action.payload ? action.payload : {};
      state.users.likes = liked;
    },
  },
});

const { reducer, actions } = usersSlice;
export const {
  updateUsername,
  updateUserProfileSuccess,
  setLoadingAuth,
  loginSuccess,
  clearUser,
  userToggleLike,
  updateUserLiked,
} = actions;

export default reducer;
