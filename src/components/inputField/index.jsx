import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Controller } from "react-hook-form";

const InputField = ({ name, label, control }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field,
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => {
        return <TextField {...field} label={label} size="small" />;
      }}
    />
  );
};

export default InputField;
