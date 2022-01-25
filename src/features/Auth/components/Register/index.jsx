import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { notify } from "../../../../utils/toastify";
import { setLoadingAuth } from "../../usersSlice";
import { signUp } from "../../usersThunks";
import RegisterForm from "../RegisterForm";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState();

  const { currentUser } = useSelector((state) => state.users.users);
  if (currentUser) history.push("/");

  const handleOnSubmit = async (formValues) => {
    dispatch(setLoadingAuth(true));
    try {
      const error = await dispatch(signUp(formValues));
      setError(error.payload);
      if (!error.payload) notify.success("Create account successfully!");
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoadingAuth(false));
  };

  return <RegisterForm error={error} onSubmit={handleOnSubmit} />;
};

export default Register;
