import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Loading } from "../../../../components";
import FiltersGame from "../../components/GameList/FiltersGame";
import GameList from "../../components/GameList/GameList";
import { getGameList } from "../../gamesThunks";

const ListPages = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loadMore, setLoadMore] = useState(false);

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return Object.keys(params).length !== 0 ? params : { genres: "action" };
  }, [location.search]);

  const gamesStore = useSelector((state) => state.games.gameList);
  const collection = queryString.stringify(queryParams);
  const gameList = gamesStore[collection]?.data;
  const currentPage = gamesStore[collection]?.page || 1;

  const loadingGameList = gamesStore.loading;
  const loadingGenres = useSelector((state) => state.games.genres.loading);

  const [pageNumber, setPageNumber] = useState(currentPage);

  useEffect(() => {
    setPageNumber(currentPage);
  }, [queryParams, currentPage]);

  // first fetch game
  useEffect(() => {
    if (gameList) return;
    (async () => {
      console.log("fetch");
      try {
        const action = getGameList(queryParams);
        await dispatch(action);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [queryParams, dispatch, gameList]);

  // Load more games
  useEffect(() => {
    if (pageNumber === 1 || currentPage === pageNumber) return;
    (async () => {
      setLoadMore(true);
      try {
        const action = getGameList({ ...queryParams, page: pageNumber });
        await dispatch(action);
      } catch (error) {
        console.log(error);
      }
      setLoadMore(false);
    })();
  }, [pageNumber, dispatch]);

  const handleFiltersChange = (formValues) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(formValues),
    });
  };

  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
    console.log("visible");
  };

  if (loadingGenres) return <Loading />;

  return (
    <div className="main__container">
      <FiltersGame filters={queryParams} onChange={handleFiltersChange} />

      {loadingGameList && <Loading position="center" />}
      <GameList
        gameList={gameList}
        queryParams={queryParams}
        loadMore={loadMore}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default ListPages;
