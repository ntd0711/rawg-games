import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { changePassword } from "../../../Auth/usersThunks";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePasswordTab = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const handleChangePassword = async (formValues) => {
    try {
      setLoading(true);
      const error = await dispatch(changePassword(formValues));

      setError(error.payload);
      if (!error.payload) {
        toast.dark("🦄 Update password successfully !", {
          position: "top-right",
          closeOnClick: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  console.log(error);
  return (
    <ChangePasswordForm
      loading={loading}
      error={error}
      onSubmit={handleChangePassword}
    />
  );
};

export default ChangePasswordTab;
