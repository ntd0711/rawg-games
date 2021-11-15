import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logOut } from "../../features/Auth/usersThunks";
import SearchForm from "../SearchForm";
import { FiLogOut } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import Avatar from "../Avatar";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector((state) => state.users.users.currentUser);
  const username = userInfo?.displayName;
  const photoURL = userInfo?.photoURL;

  const handleLogout = async () => {
    try {
      await dispatch(logOut());
      history.push("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleToProfile = () => {
    history.push(`/${username}`);
  };

  return (
    <div className="header">
      <span className="header__logo">
        <Link className="link" to="/">
          <IoGameControllerOutline />
        </Link>
      </span>
      <div className="header__search">
        <SearchForm />
      </div>

      {userInfo && (
        <>
          <div className="userInfo" onClick={handleToProfile}>
            <div className="userInfo__avatar">
              {photoURL && (
                <Avatar width="3rem" height="3rem" photoURL={photoURL} />
              )}
              {!photoURL && (
                <span
                  className="userInfo__avatar-text"
                  style={{ fontSize: "1.4rem" }}
                >
                  {username[0].toUpperCase()}
                </span>
              )}
            </div>
            <span className="userInfo__name">{username}</span>
          </div>
          <span onClick={handleLogout} className="logout__btn">
            <FiLogOut title="Logout" />
          </span>
        </>
      )}
      {!userInfo && (
        <div className="header__register">
          <span className="login__btn">
            <Link className="link" to="/signin">
              LOGIN
            </Link>
          </span>
          <span className="singup__btn">
            <Link className="link" to="/signup">
              SIGN UP
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;
