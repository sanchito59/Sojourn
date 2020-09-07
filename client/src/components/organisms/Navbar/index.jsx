import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CustomLink from "../../atoms/CustomLink";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <CustomLink to="/" color="white">
              Sojourn
            </CustomLink>
          </Typography>
          <Button color="inherit">
            <CustomLink to="/explorers" color="white">
              Explorers
            </CustomLink>
          </Button>
          <Button color="inherit">
            <CustomLink to="/register" color="white">
              Register
            </CustomLink>
          </Button>
          <Button color="inherit">
            <CustomLink to="/login" color="white">
              Login
            </CustomLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
