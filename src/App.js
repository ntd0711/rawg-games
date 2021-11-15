import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Login from "./features/Auth/components/Login";
import Register from "./features/Auth/components/Register";
import { authen } from "./features/Auth/usersThunks";
import GamesFeatures from "./features/Games";
import Profile from "./features/Profile/pages/Profile";
import Setting from "./features/Profile/pages/Setting";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const subscriber = await dispatch(authen());
      unwrapResult(subscriber);
    })();
  }, [dispatch]);

  return (
    <div className="app" style={{ margin: "0 auto" }}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/games" />
        </Route>
        <Route path="/games">
          <GamesFeatures />
        </Route>
        <Route path="/signin" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Register />
        </Route>
        <Route path="/account/edit" exact>
          <Setting />
        </Route>
        <Route path="/:username">
          <Profile />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
