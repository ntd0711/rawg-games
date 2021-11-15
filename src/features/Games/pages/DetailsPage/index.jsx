import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import Footer from "../../../../components/Footer";
import Loading from "../../../../components/Loading";
import Overlay from "../../../../components/Overlay";
import { toggleLike } from "../../../Auth/usersThunks";
import GameImages from "../../components/GameDetails/GameImages";
import GameInfo from "../../components/GameDetails/GameInfo";
import GameListTag from "../../components/GameDetails/GameListTag";
import GameThumbnails from "../../components/GameDetails/GameThumnails";
import { getGameDetails } from "../../gamesSlice";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    params: { slug },
  } = useRouteMatch();
  const likes = useSelector((state) => state.users.users.likes);
  const isAuthenticated = useSelector((state) => state.users.users.currentUser);

  const listGameInfo = useSelector((state) => state.games.gameDetails);
  const gameInfo = listGameInfo[slug]?.data;
  const screenShots = listGameInfo[slug]?.screenShots;
  const loading = listGameInfo.loading;

  useEffect(() => {
    if (gameInfo) return;
    (async () => {
      try {
        const result = await dispatch(getGameDetails(slug));
        unwrapResult(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [slug, dispatch, gameInfo, screenShots]);

  if (!gameInfo) return <Loading />;
  const { background_image, id, name, parent_platforms, tags } = gameInfo;

  const liked = likes[id];

  const handleToggleLike = async () => {
    try {
      if (isAuthenticated) {
        const action = toggleLike({ id, game: !liked ? gameInfo : null });

        dispatch(action);
      } else {
        history.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main__gameDetails">
      <Overlay />
      <div className="gameDetails">
        <GameThumbnails
          liked={liked}
          toggleLike={handleToggleLike}
          image={background_image}
        />
        <GameInfo gameInfo={gameInfo} loading={loading} />
      </div>

      <div className="gameSub">
        <GameImages screenShots={screenShots} loading={loading} />
        <GameListTag tags={tags} loading={loading} />
      </div>
      <Footer />
    </div>
  );
};

export default DetailsPage;
