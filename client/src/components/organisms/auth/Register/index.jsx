import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../../../actions/alert";
import { register } from "../../../../actions/auth";
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
} from "@material-ui/core";
import { PersonAddOutlined, Person } from "@material-ui/icons";
import CustomLink from "../../../atoms/CustomLink";
import CustomPaper from "../../../atoms/CustomPaper";

const Register = ({ register, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const { name, email, password, passwordConfirmation } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setAlert("Passwords do not match", "error");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <>
      <Container>
        <CustomPaper elevation={1} padding={20} marginTop={40}>
          <Box my={4}>
            <Typography variant="h4" component="h1" paragraph>
              Sign Up
            </Typography>
            <PersonAddOutlined />
            <Typography variant="h6" paragraph>
              Create Your Account
            </Typography>
            <form onSubmit={(e) => onSubmit(e)}>
              <FormControl>
                <TextField
                  type="text"
                  placeholder="Name"
                  label="Your Name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </FormControl>
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
              <FormControl>
                <TextField
                  type="password"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={(e) => onChange(e)}
                  minLength="6"
                />
              </FormControl>
              <TextField
                type="submit"
                value="Register"
                style={{ marginTop: "16px" }}
              />
            </form>
            <p>
              Already have an account?{" "}
              <CustomLink to="/login">Login</CustomLink>
            </p>
          </Box>
        </CustomPaper>
      </Container>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
