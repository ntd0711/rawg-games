import queryString from "query-string";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
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
  const collection = queryString.stringify(queryParams);

  const loading = gamesStore.loading;
  const gameList = gamesStore[collection]?.data;
  const currentPage = gamesStore[collection]?.page;

  useEffect(() => {
    if (gameList) return;

    try {
      const action = getGameList(queryParams);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  }, [queryParams, dispatch, gameList]);

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
    <div className="main__container">
      <FiltersGame filters={queryParams} onChange={handleFiltersChange} />

      <GameList
        gameList={gameList}
        queryParams={queryParams}
        loading={loading}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ListPages;
