import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/inputField";

const SearchForm = ({ onSubmit }) => {
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleOnSubmit = (formValues, e) => {
    if (!onSubmit) return;
    onSubmit(formValues);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <InputField control={control} name="search" label="Enter game..." />
      <Button type="submit">reset</Button>
    </Box>
  );
};

export default SearchForm;
