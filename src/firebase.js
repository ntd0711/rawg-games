// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firebase-firestore";
// import "firebase/storage";

// const app = firebase.initializeApp({
//   apiKey: "AIzaSyDoWe-9YIuhT9zWzv_CbSJ7z91JfzF0Iec",
//   authDomain: "rawg-games-bc43b.firebaseapp.com",
//   projectId: "rawg-games-bc43b",
//   storageBucket: "rawg-games-bc43b.appspot.com",
//   messagingSenderId: "877679592233",
//   appId: "1:877679592233:web:6b887ea54f7d8e4840ad38",
//   measurementId: "G-YGFYJQGKM2",
// });

// export const auth = app.auth();
// export const db = app.firestore();
// export const storage = app.storage();
// export const EmailAuthProvider = app.auth.EmailAuthProvider;

// export default app;

import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoWe-9YIuhT9zWzv_CbSJ7z91JfzF0Iec",
  authDomain: "rawg-games-bc43b.firebaseapp.com",
  projectId: "rawg-games-bc43b",
  storageBucket: "rawg-games-bc43b.appspot.com",
  messagingSenderId: "877679592233",
  appId: "1:877679592233:web:6b887ea54f7d8e4840ad38",
  measurementId: "G-YGFYJQGKM2",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.EmailAuthProvider = app.auth.EmailAuthProvider;
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }
}

export default new Firebase();
