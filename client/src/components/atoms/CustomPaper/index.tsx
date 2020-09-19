import React from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";

const StyledPaper = styled(Paper)<any>`
  padding: ${(props) => props.padding}px;
  margin-top: ${(props) => props.marginTop}px;
`;

const CustomPaper = ({
  children,
  padding,
  marginTop,
  elevation,
}: {
  children: object;
  padding: number;
  marginTop: number;
  elevation: number;
}) => {
  return (
    <StyledPaper elevation={elevation} padding={padding} marginTop={marginTop}>
      {children}
    </StyledPaper>
  );
};

export default CustomPaper;
