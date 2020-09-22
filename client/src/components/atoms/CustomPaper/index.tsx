import React from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";

const StyledPaper = styled(Paper)<any>`
  padding: ${({ padding }) => padding}px;
  margin-top: ${({ marginTop }) => marginTop}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const CustomPaper = ({
  backgroundColor,
  children,
  padding,
  marginTop,
  elevation,
}: {
  backgroundColor: string;
  children: object;
  padding: number;
  marginTop: number;
  elevation: number;
}) => {
  return (
    <StyledPaper
      backgroundColor={backgroundColor}
      elevation={elevation}
      padding={padding}
      marginTop={marginTop}
    >
      {children}
    </StyledPaper>
  );
};

CustomPaper.defaultProps = {
  elevation: 1,
  padding: 20,
  marginTop: 20,
  backgroundColor: "white",
};

export default CustomPaper;
