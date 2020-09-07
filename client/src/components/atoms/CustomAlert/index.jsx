import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";

const StyledAlert = styled(Alert)`
  margin-top: 12px;
`;

const CustomAlert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <StyledAlert key={alert.id} severity={alert.alertType} variant="outlined">
      {alert.msg}
    </StyledAlert>
  ));

CustomAlert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(CustomAlert);
