import React from "react";
import InputField from "../../../../components/InputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LoadingAuth from "../../../../components/LoadingAuth";
import { useSelector } from "react-redux";

const RegisterForm = ({ onSubmit }) => {
  const loadedAuth = useSelector((state) => state.users.users.loadedAuth);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required()
      .min(6, "please enter at least 6 characters"),
    email: yup.string().required().email("please enter your email"),
    password: yup
      .string()
      .required()
      .min(6, "please enter at least 6 characters"),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Password does not match"),
  });

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="auth__form">
      <h2>SIGN UP</h2>
      <InputField
        register={register}
        formState={formState}
        name="username"
        label="User Name"
        type="text"
      />

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

      <InputField
        register={register}
        formState={formState}
        name="passwordConfirm"
        label="Password Confirm"
        type="password"
      />

      <button type="submit">
        <span>Sign Up </span>
        <span className="loading__auth">{loadedAuth && <LoadingAuth />}</span>
      </button>
      <p className="switch__form">
        Already have an account?{" "}
        <Link className="switch__form-link" to="/signin">
          Login.
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
