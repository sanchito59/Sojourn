import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Container, Box, Typography, Button } from "@material-ui/core";
import CustomLink from "../../atoms/CustomLink";
import styled from "styled-components";

const SignUpBtn = styled(Button)`
  margin-right: 16px;
`;

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <Container maxWidth="sm">
      <Box my={4} align="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Sojourn, for explorers
        </Typography>
        <SignUpBtn my={4} variant="contained" color="primary">
          <CustomLink to="/register" color="white">
            Sign Up
          </CustomLink>
        </SignUpBtn>
        <Button variant="contained" color="default">
          <CustomLink to="/login" color="black">
            Login
          </CustomLink>
        </Button>
      </Box>
    </Container>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
