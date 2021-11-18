import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signUp } from "../../usersThunks";
import RegisterForm from "../RegisterForm";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState();

  const handleOnSubmit = async (formValues) => {
    const error = await dispatch(signUp(formValues));
    setError(error.payload);
    if (!error.payload) history.push("/");
  };

  return <RegisterForm error={error} onSubmit={handleOnSubmit} />;
};

export default Register;
