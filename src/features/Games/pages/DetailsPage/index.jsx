import { Container, createTheme, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box, maxWidth } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import GameInfo from "../../components/GameDetails/GameInfo";
import GameThumbnails from "../../components/GameDetails/GameThumnails";
import GameImages from "../../components/GameDetails/GameImages";
import { getGameDetails } from "../../gamesSlice";
import GameListTag from "../../components/GameDetails/GameListTag";

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    marginTop: theme.spacing(4),
    "&.MuiContainer-root": { maxWidth: "1000px" },
  },
  bottom: { marginTop: theme.spacing(6) },
});

const DetailsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    params: { slug },
  } = useRouteMatch();

  const listGameInfo = useSelector((state) => state.games.gameDetails);
  const gameInfo = listGameInfo[slug]?.data;
  const screenShots = listGameInfo[slug]?.screenShots;
  const loading = listGameInfo.loading;

  useEffect(() => {
    if (gameInfo) return;

    const action = getGameDetails(slug);
    dispatch(action);
  }, [slug, dispatch, gameInfo, screenShots]);

  if (!gameInfo) return "loading...";

  return (
    <Container className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={5.5} md={5.5}>
          <GameThumbnails image={gameInfo?.background_image} />
        </Grid>
        <Grid item xs={12} sm={6.5} md={6.5}>
          <GameInfo gameInfo={gameInfo} loading={loading} />
        </Grid>
      </Grid>

      <Box className={classes.bottom}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10} md={10}>
            <GameImages screenShots={screenShots} loading={loading} />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <GameListTag tags={gameInfo?.tags} loading={loading} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DetailsPage;
