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
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const classes = useStyles();

  const authControls = (
    <>
      <CustomLink to="/dashboard" color="white">
        <Button
          color="inherit"
          className={classes.button}
          startIcon={<AccountBox />}
        >
          <SiteNameSpan style={{ marginLeft: "0px" }}>Dashboard</SiteNameSpan>
        </Button>
      </CustomLink>
      <Button color="inherit">
        <CustomLink to="/posts" color="white">
          Posts
        </CustomLink>
      </Button>
      <Button color="inherit">
        <CustomLink to="/explorers" color="white">
          Explorers
        </CustomLink>
      </Button>
      <Button color="inherit" onClick={logout}>
        <ExitToApp />
        <SiteNameSpan>Logout</SiteNameSpan>
      </Button>
    </>
  );

  const guestControls = (
    <>
      <Button color="inherit">
        <CustomLink to="/login" color="white">
          Login
        </CustomLink>
      </Button>
      <Button color="inherit">
        <CustomLink to="/register" color="white">
          Register
        </CustomLink>
      </Button>
      <Button color="inherit">
        <CustomLink to="/explorers" color="white">
          Explorers
        </CustomLink>
      </Button>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "rgb(39, 55, 34)" }}>
        <Toolbar>
          <CustomLink to="/" color="white">
            <Explore />
          </CustomLink>
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
