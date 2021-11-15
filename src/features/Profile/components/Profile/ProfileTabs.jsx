import React, { useState } from "react";
import { useSelector } from "react-redux";
import GameItem from "../../../Games/components/GameList/GameItem";

const ProfileTabs = () => {
  const likes = useSelector((state) => state.users.users.likes);
  const [tabContent, setTabContent] = useState("Overviews");

  const listGameLiked = Object.keys(likes).reduce((list, key) => {
    const game = likes[key];
    list.push(game);
    return list;
  }, []);

  const handleShowTab = (e) => {
    const element = e.target;
    setTabContent(element.innerText);
  };

  return (
    <>
      <div className="profile__tabs">
        <div
          onClick={handleShowTab}
          style={
            tabContent === "Overviews"
              ? { color: "#fff", borderBottom: "2px solid #fff" }
              : {}
          }
          className="profile__tabs-item"
        >
          Overviews
        </div>
        <div
          style={
            tabContent === "Liked"
              ? { color: "#fff", borderBottom: "2px solid #fff" }
              : {}
          }
          onClick={handleShowTab}
          className="profile__tabs-item"
        >
          Liked
        </div>
      </div>
      <div className="profile__tabContent">
        {tabContent === "Overviews" && (
          <div className="profile__tabPane">
            <h2>Overviews</h2>
          </div>
        )}
        {tabContent === "Liked" && (
          <div className="profile__tabPane profile__userLiked">
            {listGameLiked.map((game, index) => (
              <GameItem key={index} game={game} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileTabs;
