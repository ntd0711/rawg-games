import {
  Card,
  CardContent,
  CardMedia,
  createTheme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { renderIcon } from "../../../utils/index";

const theme = createTheme();
const useStyles = makeStyles({
  card: {
    minHeight: "320px",
  },

  cardMedia: {
    width: "100%",
    height: "200px",
  },
  icon: {
    display: "inline-block",
    marginRight: theme.spacing(1),
  },
  title: {
    cursor: "pointer",
    display: "inline-block",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
});

const GameItem = ({ game }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        component="img"
        //   height="140"
        image={game.background_image}
        alt="green iguana"
      />
      <CardContent>
        <Box>
          {game.parent_platforms.map((platform) => (
            <Box key={platform.platform.id} className={classes.icon}>
              {renderIcon(platform.platform.slug)}
            </Box>
          ))}
        </Box>
        <Typography className={classes.title} variant="h5" component="div">
          {game.name}
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
    </Card>
  );
};

export default GameItem;
