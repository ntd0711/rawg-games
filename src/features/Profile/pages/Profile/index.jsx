import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileTabs from "../../components/Profile/ProfileTabs";

const Profile = () => {
  const {
    params: { username },
  } = useRouteMatch();

  const userInfo = useSelector((state) => {
    const displayName = state.users.users.currentUser?.displayName;
    return displayName === username ? state.users.users.currentUser : null;
  });

  return (
    <>
      {/* {!userInfo && <NotFound />} */}
      {userInfo && (
        <div className="profile">
          <div className="profile__user">
            <ProfileInfo userInfo={userInfo} />
            <ProfileTabs />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
