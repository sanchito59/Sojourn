import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Container, Box, Typography, Button } from "@material-ui/core";
import CustomLink from "../../atoms/CustomLink";
import styled from "styled-components";
import TopoBackground from "../../../assets/images/topographic.jpg";
import CustomPaper from "../../atoms/CustomPaper";

const Page = styled.section`
  background-image: url(${TopoBackground});
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 0;
`;

const SignUpBtn = styled(Button)`
  margin-right: 16px;
`;

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <Page>
      <Container maxWidth="sm" style={{ paddingTop: "40px" }}>
        <CustomPaper elevation={4} backgroundColor="#475841">
          <CustomPaper elevation={4} backgroundColor="#495735">
            <CustomPaper elevation={4} backgroundColor="#8f91a2">
              <CustomPaper elevation={4} backgroundColor="#e6e8e6">
                <CustomPaper elevation={4}>
                  <Box my={4} align="center">
                    <Typography variant="h3" component="h1" gutterBottom>
                      Sojourn
                      <br />
                      for explorers
                      <br />
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
                </CustomPaper>
              </CustomPaper>
            </CustomPaper>
          </CustomPaper>
        </CustomPaper>
      </Container>
    </Page>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
