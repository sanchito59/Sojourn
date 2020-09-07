import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: ${(props) => props.color};
  text-decoration: ${(props) => !props.underline && "none"}; ;
`;

function CustomLink({ children, to, color, underline }) {
  return (
    <StyledLink to={to} color={color} underline={underline}>
      {children}
    </StyledLink>
  );
}

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  color: PropTypes.string,
  underline: PropTypes.bool,
};

CustomLink.defaultPropTypes = {
  color: "black",
  underline: false,
};

export default CustomLink;
