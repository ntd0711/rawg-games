import { unwrapResult } from "@reduxjs/toolkit";
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
      const response = await dispatch(logIn(formValues));
      if (response.payload.hasOwnProperty("error")) {
        setError(response.payload.error);
      } else {
        setError();
        history.push("/");
      }

      unwrapResult(response);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoadingAuth(false));
  };

  return <LoginForm errorMessage={error} onSubmit={handleOnSubmit} />;
};
export default Login;
