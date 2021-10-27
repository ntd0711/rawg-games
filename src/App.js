import { Button } from "@mui/material";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import GamesFeatures from "./features";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/games" />
        </Route>
        <Route path="/games">
          <GamesFeatures />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
