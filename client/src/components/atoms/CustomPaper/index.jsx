import React from "react";
import { Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledPaper = styled(Paper)`
  padding: ${(props) => props.padding}px;
  margin-top: ${(props) => props.marginTop}px;
`;

const CustomPaper = ({ children, padding, marginTop }) => {
  return (
    <StyledPaper padding={padding} marginTop={marginTop}>
      {children}
    </StyledPaper>
  );
};

CustomPaper.propTypes = {
  padding: PropTypes.number,
  marginTop: PropTypes.number,
};

CustomPaper.defaultPropTypes = {
  // @TODO: Fix these declarations
  padding: 20,
  marginTop: 0,
};

export default CustomPaper;
