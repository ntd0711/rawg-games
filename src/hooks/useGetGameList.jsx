import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGameList } from "../features/Games/gamesSlice";
import useGetCurrPageByParams from "./useGetCurrPageByParams";

const useGetGameList = (queryParams, page) => {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const currentPage = useGetCurrPageByParams(queryParams);

  useEffect(() => {
    if (currentPage === page) return;
    (async () => {
      setLoading(true);
      setError(false);
      try {
        const action = getGameList({ ...queryParams, page });
        dispatch(action);

        setHasMore(true);
      } catch (error) {
        console.log(error);
        setError(true);
      }
      setLoading(false);
    })();
  }, [page, dispatch]);

  return {
    loading,
    error,
    hasMore,
  };
};

export default useGetGameList;
