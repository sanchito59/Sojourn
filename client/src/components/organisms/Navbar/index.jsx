import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { Explore, ExitToApp, Menu as MenuIcon } from "@material-ui/icons";
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

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const classes = useStyles();

  const authControls = (
    <>
      <Button color="inherit">
        <CustomLink to="/explorers" color="white">
          Explorers
        </CustomLink>
      </Button>
      <Button color="inherit" onClick={logout}>
        <ExitToApp /> Logout
      </Button>
    </>
  );

  const guestControls = (
    <>
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
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Explore />
          <Typography variant="h6" className={classes.title}>
            <CustomLink to="/" color="white">
              Sojourn
            </CustomLink>
          </Typography>
          {!loading && <>{isAuthenticated ? authControls : guestControls}</>}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
