import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../../components/Avatar";
import { AiOutlineSetting } from "react-icons/ai";

const ProfileInfo = ({ userInfo }) => {
  const { displayName: username, photoURL } = userInfo;

  return (
    <div className="profile__userInfo userInfo">
      <div className="profile__avatar userInfo__avatar">
        {photoURL && <Avatar width="5rem" height="5rem" photoURL={photoURL} />}
        {!photoURL && (
          <span
            className="userInfo__avatar-text"
            style={{ fontSize: "2.4rem" }}
          >
            {username[0].toUpperCase()}
          </span>
        )}
      </div>
      <span className="profile__name userInfo__name">{username}</span>
      <div className="setting__btn">
        <Link to="/account/edit" className="setting__btn-link">
          Edit Profile
        </Link>
      </div>
      <div className="setting__btnIcon">
        <Link to="/account/edit" style={{ color: "white" }}>
          <AiOutlineSetting />
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
