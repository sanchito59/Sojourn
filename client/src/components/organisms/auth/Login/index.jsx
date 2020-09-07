import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
} from "@material-ui/core";
import CustomLink from "../../../atoms/CustomLink";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <>
      <Container>
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
      </Container>
    </>
  );
};

export default Login;
