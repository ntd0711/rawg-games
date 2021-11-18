import React, { useCallback, useRef } from "react";
import { Loading } from "../../../../components";
import GameItem from "./GameItem";

const GameList = ({ gameList, onLoadMore, loadMore }) => {
  const observer = useRef();

  const lastGameElementRef = useCallback(
    (node) => {
      if (loadMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (onLoadMore) onLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore, onLoadMore]
  );

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
        {loadMore && <Loading position="bottom" />}
      </div>
    </div>
  );
};

export default GameList;
