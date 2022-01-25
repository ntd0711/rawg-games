import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase";

import {
  clearUser,
  loginSuccess,
  updateUsername,
  updateUserLiked,
  userToggleLike,
  updateUserProfileSuccess,
} from "./usersSlice";

export const logIn = createAsyncThunk("logIn", async ({ email, password }) => {
  await firebase.auth.signInWithEmailAndPassword(email, password);
});

export const signUp = createAsyncThunk(
  "signUp",
  async ({ username, email, password }, thunkApi) => {
    try {
      //username existed
      const usernameExisted = await firebase.db
        .collection("users")
        .doc(username)
        .get();
      if (usernameExisted.data()) {
        return "The username is already in use by another account.";
      }

      //email existed
      const emailExisted = await firebase.auth.fetchSignInMethodsForEmail(
        email
      );
      if (emailExisted && emailExisted.length > 0) {
        return "The email address is already in use by another account.";
      }

      //create user
      const res = await firebase.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await res.user.updateProfile({ displayName: username });

      await firebase.db
        .collection("users")
        .doc(res.user.displayName)
        .set({
          uid: res.user.uid,
          displayName: res.user.displayName,
          photoURL: null,
        })
        .catch(console.error);

      thunkApi.dispatch(updateUsername(res.user.displayName));
    } catch (error) {
      console.log(error);
    }
  }
);

export const logOut = createAsyncThunk("logOut", async () => {
  return await firebase.auth.signOut();
});

export const fetchUserLikes = createAsyncThunk(
  "fetchUserLikes",
  async (uid, thunkApi) => {
    try {
      const response = await firebase.db.collection("likes").doc(uid).get();
      const liked = response.data();
      thunkApi.dispatch(updateUserLiked(liked));
    } catch (error) {
      console.log(error);
    }
  }
);

export const toggleLike = createAsyncThunk(
  "toggleLike",
  async (payload, thunkApi) => {
    const { id, game } = payload;
    const { currentUser } = firebase.auth;

    try {
      if (currentUser) {
        const { uid } = currentUser;
        const docRef = firebase.db.collection("likes").doc(uid);

        await docRef.set({ [id]: game }, { merge: true });

        thunkApi.dispatch(userToggleLike({ id, game }));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const authen = createAsyncThunk("authen", async (payload, thunkApi) => {
  try {
    return await firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        const fetchedUser = {
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
        };
        thunkApi.dispatch(loginSuccess(fetchedUser));
        thunkApi.dispatch(fetchUserLikes(fetchedUser.uid));
      } else {
        thunkApi.dispatch(clearUser());
      }
    });
  } catch (error) {
    console.log(error);
  }
});

export const changePassword = createAsyncThunk(
  "changePassword",
  async (payload, thunkApi) => {
    const { currentUser } = firebase.auth;
    if (!currentUser) {
      return;
    }
    const { currentPassword, newPassword } = payload;

    try {
      const { email } = currentUser;
      const credential = firebase.EmailAuthProvider.credential(
        email,
        currentPassword
      );
      const res = await currentUser.reauthenticateWithCredential(credential);
      if (res) {
        await currentUser.updatePassword(newPassword);
      }
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        return "Enter a valid current password and try again.";
      }
      return "error-Something went wrong";
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (payload, thunkApi) => {
    const { currentUser } = firebase.auth;

    if (!currentUser) {
      return;
    }

    const storageRef = firebase.storage.ref();
    const { photo, username } = payload;
    const { uid, displayName } = currentUser;
    let propsShouldUpdate = { displayName: username };

    try {
      // username existed
      if (displayName !== username) {
        const usernameExisted = await firebase.db
          .collection("users")
          .doc(username)
          .get();
        if (usernameExisted.data()) {
          return "The username is already in use by another account.";
        }
      }

      if (photo[0]) {
        console.log("has photo");
        //upload image to storage
        await storageRef.child(uid).put(photo[0]);
        //get image url
        const url = await storageRef.child(uid).getDownloadURL();

        propsShouldUpdate = { ...propsShouldUpdate, photoURL: url };
      }

      //update auth profile
      currentUser.updateProfile({
        ...propsShouldUpdate,
      });

      const collectRef = firebase.db.collection("users").doc(displayName);
      if (displayName === username) {
        //update only
        collectRef.update({
          ...propsShouldUpdate,
        });
      } else {
        //delete current user and add new user with new key
        const previousUser = await collectRef.get();

        collectRef.delete();

        firebase.db
          .collection("users")
          .doc(username)
          .set({
            ...previousUser.data(),
            ...propsShouldUpdate,
          });
      }

      // update reducer
      thunkApi.dispatch(updateUserProfileSuccess(propsShouldUpdate));
    } catch (err) {
      throw err;
    }
  }
);
