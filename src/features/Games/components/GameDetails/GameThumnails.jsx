import React from "react";
import { AiFillLike, AiOutlinePlusCircle } from "react-icons/ai";

const GameThumbnails = ({ image, toggleLike, liked }) => {
  const handleToggleLike = () => {
    if (toggleLike) toggleLike();
  };

  return (
    <div className="gameDetails__card">
      <div
        className="gameDetails__thumbnails"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="gameDetails__action">
        <span
          style={{ backgroundColor: liked ? "#0084ff" : "" }}
          onClick={handleToggleLike}
        >
          <AiFillLike className="gameDetails__action-icon" />
          Like
        </span>
        <span>
          <AiOutlinePlusCircle className="gameDetails__action-icon" />
          Collection
        </span>
      </div>
    </div>
  );
};

export default GameThumbnails;
