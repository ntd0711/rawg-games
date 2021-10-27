import { Container, createTheme, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useRef } from "react";
import GameItem from "./GameItem";

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    marginTop: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(0, 2),
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
  },
});

const GameList = ({ gameList, onLoadMore }) => {
  const classes = useStyles();

  const observer = useRef();

  const lastGameElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!onLoadMore) return;
        onLoadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Grid container spacing={4}>
          {gameList?.map((game, index) => {
            if (gameList.length === index + 1) {
              return (
                <Grid
                  ref={lastGameElementRef}
                  item
                  key={game.id}
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <GameItem game={game} />
                </Grid>
              );
            } else {
              return (
                <Grid item key={game.id} xs={12} sm={6} md={4}>
                  <GameItem game={game} />
                </Grid>
              );
            }
          })}
        </Grid>
      </Paper>
    </Container>
  );
};

export default GameList;
