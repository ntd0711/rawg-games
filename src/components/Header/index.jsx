import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { Box } from "@mui/system";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {},
  navbar: {},
  title: { textDecoration: "none", color: "white" },
});

const Header = () => {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      <AppBar className={classes.navbar} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <CodeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={classes.title} to="/">
              RAWG
            </Link>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
