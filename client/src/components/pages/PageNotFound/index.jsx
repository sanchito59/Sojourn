import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import CustomPaper from "../../atoms/CustomPaper";
import CustomLink from "../../atoms/CustomLink";

const PageNotFound = () => {
  return (
    <Container size="lg">
      <Box my={4}>
        <Typography variant="h1" component="h1" paragraph>
          Page Not Found
        </Typography>
        <Typography variant="h4" component="h4">
          Sorry this page does not exist
        </Typography>
        <CustomPaper>
          <CustomLink to="/" color="black">
            Go Home
          </CustomLink>
        </CustomPaper>
      </Box>
    </Container>
  );
};

export default PageNotFound;
