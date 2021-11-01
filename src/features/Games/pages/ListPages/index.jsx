import { Box } from "@mui/system";
import queryString from "query-string";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { useGetAllGamesQuery } from "../../../../services/gamesApi";
import { gamesApi } from "../../../../services/gamesApi";
import FiltersGame from "../../components/GameList/FiltersGame";
import GameList from "../../components/GameList/GameList";
import { getGameList } from "../../gamesSlice";

const ListPages = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    const hasParams = Object.keys(params).length;

    if (hasParams) return params;

    return {
      // ...params,
      genres: params.genres || "action",
    };
  }, [location.search]);

  const gamesStore = useSelector((state) => state.games.gameList);
  const searchParams = queryString.stringify(queryParams);

  const loading = gamesStore.loading;
  const gameList = gamesStore[searchParams]?.data;
  const currentPage = gamesStore[searchParams]?.page;

  useEffect(() => {
    if (gameList) return;

    try {
      const action = getGameList(queryParams);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  }, [queryParams, dispatch, gameList]);

  // setLoading(gameList?.length > 0);
  // if (isFetching) return "Loading...";

  // -------------------------------------------------------------------

  // const { data, error, isFetching } = useGetAllGamesQuery(queryParams);

  // const gameList = data?.results;

  // const state = useSelector((state) => state.gamesApi);
  // console.log(state);
  // -------------------------------------------------------------------\
  const handleFiltersChange = (formValues) => {
    // const newFilters = {
    //   ...queryParams,
    //   ...formValues,
    // };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(formValues),
    });
  };

  return (
    <Box>
      <FiltersGame filters={queryParams} onChange={handleFiltersChange} />

      <GameList
        gameList={gameList}
        queryParams={queryParams}
        loading={loading}
        currentPage={currentPage}
      />
    </Box>
  );
};

export default ListPages;
