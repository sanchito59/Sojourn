import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../../../actions/alert";
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
} from "@material-ui/core";
import CustomLink from "../../../atoms/CustomLink";

const Register = ({ setAlert }) => {
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
      console.log(formData);
    }
  };

  return (
    <>
      <Container>
        <Box my={4}>
          <Typography variant="h4" component="h1" paragraph>
            Sign Up
          </Typography>
          <Typography variant="h6" paragraph>
            [@] Create Your Account
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
                required
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
            Already have an account? <CustomLink to="/login">Login</CustomLink>
          </p>
        </Box>
      </Container>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
