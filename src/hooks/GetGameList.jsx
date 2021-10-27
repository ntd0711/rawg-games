import React from "react";
import { useGetAllGamesQuery } from "../services/gamesApi";

const GetGameList = (queryParams) => {
  const { data, error, isFetching } = useGetAllGamesQuery(queryParams);
  return { data, error, isFetching };
};

export default GetGameList;
