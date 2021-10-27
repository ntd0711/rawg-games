import { Chip } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const FilterTag = ({ filters, genreList = [], onChange = null }) => {
  const handleFiltersChange = (genres) => {
    if (!onChange) return;

    const formValues = { genres };

    onChange(formValues);
  };
  return (
    <>
      {genreList.map((genre) => (
        <Chip
          key={genre.id}
          sx={{ m: 1 }}
          size="small"
          label={`${genre.name}`}
          color={genre.slug === filters.genres ? "primary" : "default"}
          clickable
          onClick={() => handleFiltersChange(genre.slug)}
        />
      ))}
    </>
  );
};

export default FilterTag;
