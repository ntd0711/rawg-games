import { Box } from "@mui/system";
import queryString from "query-string";
import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import GetGameList from "../../../../hooks/GetGameList";
import { useGetAllGamesQuery } from "../../../../services/gamesApi";
import FiltersGame from "../../components/FiltersGame";
import GameList from "../../components/GameList";
import { gamesApi } from "../../../../services/gamesApi";

const ListPages = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // const [totalGameList, setTotalGameList] = useState([]);

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      genres: params.genres || "action",
    };
  }, [location.search]);

  // const gamesStore = useSelector((state) => state.games.gameList);
  // console.log(gamesStore);

  // const result = gamesStore?.find(
  //   (item) => item.params === queryString.stringify(queryParams)
  // );
  // console.log(result);

  // useEffect(() => {
  //   if (result) return;
  //   try {
  //     setIsFetching(true);

  //     const action = getGameList(queryParams);
  //     dispatch(action);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setIsFetching(false);
  // }, [queryParams, dispatch, result]);

  // const gameList = result?.results;

  const { data, error, isFetching } = useGetAllGamesQuery(queryParams);

  const gameList = data?.results;

  const state = useSelector((state) => state.gamesApi);
  console.log(state);
  const handleFiltersChange = (formValues) => {
    const newFilters = {
      ...queryParams,
      ...formValues,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  const handleLoadMore = () => {
    const newFilters = {
      ...queryParams,
      page: Number.parseInt(queryParams.page) + 1 || 2,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <FiltersGame filters={queryParams} onChange={handleFiltersChange} />
      {isFetching && "loading..."}
      {!isFetching && (
        <GameList gameList={gameList} onLoadMore={handleLoadMore} />
      )}
    </Box>
  );
};

export default ListPages;
