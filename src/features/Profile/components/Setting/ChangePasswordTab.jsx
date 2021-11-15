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

      if (error.payload) {
        const [field, message] = error.payload.split("-");
        // setError({ field, message });
        alert(error.payload);
      } else {
        toast.dark("🦄 Update password successfully !", {
          position: "top-right",
          closeOnClick: true,
        });
        setError();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <ChangePasswordForm
      loading={loading}
      otherError={error}
      onSubmit={handleChangePassword}
    />
  );
};

export default ChangePasswordTab;
