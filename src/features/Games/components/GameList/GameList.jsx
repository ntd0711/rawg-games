import React, { useCallback, useEffect, useRef, useState } from "react";
import Loading from "../../../../components/Loading";
import useGetCurrPageByParams from "../../../../hooks/useGetCurrPageByParams";
import useGetGameList from "../../../../hooks/useGetGameList";
import GameItem from "./GameItem";

const GameList = ({ gameList, queryParams, loading }) => {
  const currentPage = useGetCurrPageByParams(queryParams) || 1;

  const [pageNumber, setPageNumber] = useState(currentPage);

  useEffect(() => {
    // const searchParams = queryString.stringify(queryParams)
    setPageNumber(currentPage);
  }, [queryParams, currentPage]);

  useGetGameList(queryParams, pageNumber);

  const observer = useRef();
  const lastGameElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prev) => prev + 1);
          console.log("visible");
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  if (!gameList) return <Loading position="top" />;
  return (
    <div>
      <div className="gameContainer">
        {gameList?.map((game, index) => {
          if (gameList.length === index + 1) {
            return (
              <div ref={lastGameElementRef} key={game.id}>
                <GameItem game={game} />
              </div>
            );
          } else {
            return (
              <div key={game.id}>
                <GameItem game={game} />
              </div>
            );
          }
        })}
        {loading && <Loading position="bottom" />}
      </div>
    </div>
  );
};

export default GameList;
