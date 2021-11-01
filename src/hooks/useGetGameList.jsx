import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGameList } from "../features/Games/gamesSlice";
import useGetCurrPageByParams from "./useGetCurrPageByParams";

const useGetGameList = (queryParams, page) => {
  const dispatch = useDispatch();

  const currentPage = useGetCurrPageByParams(queryParams);

  useEffect(() => {
    if (currentPage === page) return;
    (async () => {
      try {
        const action = getGameList({ ...queryParams, page });
        dispatch(action);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [page, dispatch]);

  return {};
};

export default useGetGameList;
