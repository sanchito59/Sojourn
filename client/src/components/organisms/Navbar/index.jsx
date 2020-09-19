import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Explore, ExitToApp, AccountBox } from "@material-ui/icons";
import CustomLink from "../../atoms/CustomLink";

const SiteNameSpan = styled.span`
  margin-left: 12px;
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

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
      <Button color="inherit">
        <CustomLink to="/posts" color="white">
          Posts
        </CustomLink>
      </Button>
      <Button color="inherit">
        <AccountBox />
        <CustomLink to="/dashboard" color="white">
          Dashboard
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
          <Explore />
          <Typography variant="h6" className={classes.title}>
            <CustomLink to="/" color="white">
              <SiteNameSpan>Sojourn</SiteNameSpan>
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
