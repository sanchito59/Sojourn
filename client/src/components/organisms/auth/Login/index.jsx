import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { login } from "../../../../actions/auth";
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
} from "@material-ui/core";
import CustomPaper from "../../../atoms/CustomPaper";
import CustomLink from "../../../atoms/CustomLink";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <>
      <Container>
        <CustomPaper elevation={1} padding={20} marginTop={40}>
          <Box my={4}>
            <Typography variant="h4" component="h1" paragraph>
              Sign In
            </Typography>
            <Typography variant="h6" paragraph>
              [@] Log into your account
            </Typography>
            <form onSubmit={(e) => onSubmit(e)}>
              <FormControl>
                <TextField
                  type="email"
                  placeholder="Email Address"
                  label="Your Email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </FormControl>
              <FormControl>
                <TextField
                  type="password"
                  placeholder="Password"
                  name="password"
                  label="Password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  minLength="6"
                />
              </FormControl>
              <TextField
                type="submit"
                value="Login"
                style={{ marginTop: "16px" }}
              />
            </form>
            <p>
              Don't have an account yet?{" "}
              <CustomLink to="/register">Sign Up</CustomLink>
            </p>
          </Box>
        </CustomPaper>
      </Container>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
