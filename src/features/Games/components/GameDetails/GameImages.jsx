import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const GameImages = ({ screenShots = {} }) => {
  const { results: images } = screenShots;

  return (
    <Grid container spacing={1}>
      {images?.map((image) => (
        <Grid item sm={6} md={6} key={image.id}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={image.image}
            alt=""
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default GameImages;
