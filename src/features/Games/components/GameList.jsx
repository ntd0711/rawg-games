import {
  CircularProgress,
  Container,
  createTheme,
  Grid,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";

import GameItem from "./GameItem";
import { useGetAllGamesQuery } from "../../../services/gamesApi";
import useGetGameList from "../../../hooks/useGetGameList";
import { Box } from "@mui/system";
import useGetCurrPageByParams from "../../../hooks/useGetCurrPageByParams";
import SkeletonGameList from "./SkeletonGameList";

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    marginTop: theme.spacing(8),
    position: "relative",
  },
  paper: {
    padding: theme.spacing(2, 2, 4),
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
  },
  circleLoading: {
    position: "absolute",
    bottom: 0,
    right: "50%",
    transform: "translateX(50%)",
    margin: theme.spacing(3, 0),
  },
});

const GameList = ({ gameList, queryParams }) => {
  const classes = useStyles();
  const currentPage = useGetCurrPageByParams(queryParams) || 1;

  const [pageNumber, setPageNumber] = useState(currentPage);

  useEffect(() => {
    // const searchParams = queryString.stringify(queryParams)
    setPageNumber(currentPage);
  }, [queryParams, currentPage]);

  // console.log(queryString.stringify(queryParams));
  // console.log(pageNumber);

  const { error, hasMore, loading } = useGetGameList(queryParams, pageNumber);

  const observer = useRef();
  const lastGameElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  console.log(loading);
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        {!gameList && <SkeletonGameList quantity={20} />}
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
                  md={3}
                >
                  <GameItem game={game} />
                </Grid>
              );
            } else {
              return (
                <Grid item key={game.id} xs={12} sm={6} md={3}>
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
