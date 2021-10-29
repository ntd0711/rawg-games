import queryString from "query-string";
import { useSelector } from "react-redux";

const useGetCurrPageByParams = (queryParams) => {
  const gamesStore = useSelector((state) => state.games.gameList);
  const searchParams = queryString.stringify(queryParams);
  const currentPage = gamesStore[searchParams]?.page;

  return currentPage;
};

export default useGetCurrPageByParams;
