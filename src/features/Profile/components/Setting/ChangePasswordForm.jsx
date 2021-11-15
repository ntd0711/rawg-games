import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/InputField";
import LoadingAuth from "../../../../components/LoadingAuth";

const ChangePasswordForm = ({ onSubmit, loading, otherError }) => {
  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .required()
      .min(6, "please enter at least 6 characters"),
    newPassword: yup
      .string()
      .required()
      .min(6, "please enter at least 6 characters"),
    confirmNewPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("newPassword")], "Password does not match"),
  });

  const { handleSubmit, register, formState, setError } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="auth__form">
      <h2>Change Password</h2>
      <InputField
        register={register}
        formState={formState}
        name="currentPassword"
        label="Current Password"
        type="password"
        otherError={otherError}
      />

      <InputField
        register={register}
        formState={formState}
        name="newPassword"
        label="New Password"
        type="password"
      />

      <InputField
        register={register}
        formState={formState}
        name="confirmNewPassword"
        label="Confirm Password Confirm"
        type="password"
      />

      <button type="submit">
        <span>Saves Change </span>
        <span className="loading__auth">{loading && <LoadingAuth />}</span>
      </button>
    </form>
  );
};

export default ChangePasswordForm;
