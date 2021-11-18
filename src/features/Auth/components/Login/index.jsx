import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setLoadingAuth } from "../../usersSlice";
import { logIn } from "../../usersThunks";
import LoginForm from "../LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState();

  const { currentUser } = useSelector((state) => state.users.users);
  if (currentUser) history.push("/");

  const handleOnSubmit = async (formValues) => {
    try {
      await dispatch(logIn(formValues));
    } catch (error) {
      console.log(error);
      setError("The account or password is invalid");
      dispatch(setLoadingAuth(false));
    }
  };

  return <LoginForm errorMessage={error} onSubmit={handleOnSubmit} />;
};
export default Login;
