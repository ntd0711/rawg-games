import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import InputField from "../../../../components/InputField";
import InputImage from "../../../../components/InputImage";
import LoadingAuth from "../../../../components/LoadingAuth";

const EditProfileForm = ({ onSubmit, loading }) => {
  const username = useSelector(
    (state) => state.users.users.currentUser?.displayName
  );

  const schema = yup.object().shape({
    username: yup
      .string()
      .required()
      .min(5, "please enter at least 5 characters"),
  });

  const { handleSubmit, register, formState, setValue } = useForm({
    defaultValues: {
      username: username || "",
      photo: undefined,
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (formValues) => {
    if (onSubmit) onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="auth__form">
      <h2>Profile</h2>
      <InputImage
        name="photo"
        register={register}
        setValue={setValue}
        formState={formState}
      />
      <InputField
        register={register}
        formState={formState}
        name="username"
        label="User Name"
        type="text"
      />

      <button type="submit">
        <span>Saves Change </span>
        <span className="loading__auth">{loading && <LoadingAuth />}</span>
      </button>
    </form>
  );
};

export default EditProfileForm;
