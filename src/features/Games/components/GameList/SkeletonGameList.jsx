import { Card, createTheme, Grid, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";

const theme = createTheme();
const useStyles = makeStyles({
  skeletonCard: {
    minHeight: "320px",
  },
  sktIcon: {
    marginLeft: theme.spacing(1),
  },
});
const SkeletonGameList = ({ quantity }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={4}>
      {Array.from(new Array(quantity)).map((item, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={6}
          md={3}
          className={classes.skeletonCard}
        >
          {/* <Card sx={{ height: "100%" }}> */}
          <Skeleton variant="rectangular" width="100%" height={150} />
          <Box sx={{ padding: theme.spacing(2) }}>
            <Box sx={{ display: "flex", marginBottom: theme.spacing(1) }}>
              <Skeleton variant="circular" width={18} height={18} />
              <Skeleton
                className={classes.sktIcon}
                variant="circular"
                width={18}
                height={18}
              />
              <Skeleton
                className={classes.sktIcon}
                variant="circular"
                width={18}
                height={18}
              />
            </Box>
            <Skeleton variant="text" height={18} />
            <Skeleton variant="text" width="40%" height={18} />
          </Box>
          {/* </Card> */}
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonGameList;
