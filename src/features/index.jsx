import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { NotFound } from "../components";
import DetailsPage from "./Games/pages/DetailsPage";
import ListPages from "./Games/pages/ListPages";

const GamesFeatures = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={url} component={ListPages} exact />
      <Route path={`${url}/:slug`} component={DetailsPage} exact />
      <Route component={NotFound} />
    </Switch>
  );
};

export default GamesFeatures;
