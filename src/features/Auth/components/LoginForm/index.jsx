import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { InputField, LoadingAuth } from "../../../../components";

const LoginForm = ({ onSubmit, errorMessage }) => {
  const loadedAuth = useSelector((state) => state.users.users.loadedAuth);

  const schema = yup.object().shape({
    email: yup.string().required().email("please enter your email"),
    password: yup.string().required().min(6, "please enter 6 character"),
  });

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="auth__form">
      <h2>LOGIN</h2>
      {errorMessage && <p className="account__error">{errorMessage}</p>}
      <InputField
        register={register}
        formState={formState}
        name="email"
        label="Email"
        type="text"
      />
      <InputField
        register={register}
        formState={formState}
        name="password"
        label="Password"
        type="password"
      />

      <button type="submit">
        <span className="auth__btn-login">Login </span>
        <span className="loading__auth">{loadedAuth && <LoadingAuth />}</span>
      </button>
      <p className="switch__form">
        Don't have an account?{" "}
        <Link className="switch__form-link" to="/signup">
          Sign up.
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
