import { unwrapResult } from "@reduxjs/toolkit";
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

  const handleRename = async (formValues) => {
    const { username, photo } = formValues;
    console.log({ photo: photo.length, username });
    if (photo.length === 0 && displayName === username) return;
    try {
      setLoading(true);
      const error = await dispatch(updateUser(formValues));

      console.log(error);
      if (error.payload) {
        alert(error.payload);
      } else {
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

  return <EditProfileForm onSubmit={handleRename} loading={loading} />;
};

export default EditProfileTab;
