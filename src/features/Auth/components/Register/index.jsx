import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signUp } from "../../usersThunks";
import RegisterForm from "../RegisterForm";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnSubmit = async (formValues) => {
    const error = await dispatch(signUp(formValues));
    if (error.payload) alert(error.payload);
    history.push("/");
  };
  return <RegisterForm onSubmit={handleOnSubmit} />;
};

export default Register;
