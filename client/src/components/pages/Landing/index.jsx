import React from "react";
import { Container, Box, Typography, Button } from "@material-ui/core";
import styled from "styled-components";

const SignUpBtn = styled(Button)`
  margin-right: 16px;
`;

const Landing = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4} align="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Sojourn, for explorers
        </Typography>
        <SignUpBtn my={4} variant="contained" color="primary">
          Sign Up
        </SignUpBtn>
        <Button variant="contained" color="default">
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Landing;
