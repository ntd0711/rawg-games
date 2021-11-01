import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";

const theme = createTheme();
const useStyles = makeStyles({
  image: {
    width: "100%",
    height: "300px",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
});

const GameThumbnails = ({ image }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.image}
      sx={{ backgroundImage: `url(${image})` }}
    ></Box>
  );
};

export default GameThumbnails;
