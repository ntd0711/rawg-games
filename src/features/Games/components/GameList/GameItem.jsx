import React from "react";
import { AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { renderIcon } from "../../../../utils/index";
import { toggleLike } from "../../../Auth/usersThunks";

const GameItem = ({ game }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const likes = useSelector((state) => state.users.users.likes);
  const isAuthenticated = useSelector((state) => state.users.users.currentUser);

  const handleClick = () => {
    history.push({
      pathname: `games/${game.slug}`,
    });
  };

  if (!game) return "";
  const { background_image, id, name, parent_platforms } = game;
  const liked = likes[id];

  const handleToggleLike = async () => {
    try {
      if (isAuthenticated) {
        const action = toggleLike({ id, game: !liked ? game : null });

        dispatch(action);
      } else {
        history.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cardGame">
      <div
        className="cardGame__thumbnail"
        style={{ backgroundImage: `url(${background_image})` }}
      ></div>
      <div className="cardGame__info">
        <div className="cardGame__infoTop">
          <div className="cardGame__platform">
            {parent_platforms.map(({ platform }) => {
              const Icon = renderIcon(platform.slug);
              return Icon ? (
                <Icon
                  key={platform.id}
                  style={{ marginRight: "0.6rem" }}
                  className="cardGame__platform-icon"
                />
              ) : null;
            })}
          </div>
          <div className="cardGame__meta"></div>
        </div>
        <div className="cardGame__infoBottom">
          <p onClick={handleClick} className="cardGame__name">
            {name}
          </p>
          <p onClick={handleToggleLike}>
            <AiFillLike
              className="cardGame__like"
              style={{ color: liked ? "#0084ff" : "" }}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameItem;
