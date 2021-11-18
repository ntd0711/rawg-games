import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../../Auth/usersThunks";
import EditProfileForm from "./EditProfileForm";

const EditProfileTab = () => {
  const dispatch = useDispatch();
  const displayName = useSelector(
    (state) => state.users.users.currentUser?.displayName
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleRename = async (formValues) => {
    const { username, photo } = formValues;
    if (photo.length === 0 && displayName === username) return;

    try {
      setLoading(true);
      const error = await dispatch(updateUser(formValues));
      setError(error.payload);

      if (!error.payload) {
        toast.dark("🦄 Update profile successfully !", {
          position: "top-right",
          closeOnClick: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <EditProfileForm onSubmit={handleRename} error={error} loading={loading} />
  );
};

export default EditProfileTab;
