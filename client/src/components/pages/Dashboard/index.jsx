import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../actions/profile";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import DashboardActions from "../../molecules/DashboardActions";
import CustomLink from "../../atoms/CustomLink";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <CircularProgress />
  ) : (
    <>
      <div>
        <Typography variant="h3" component="h1">
          Dashboard
        </Typography>
        <Typography variant="p">Welcome, {user && user.name}</Typography>
      </div>
      {profile !== null ? (
        <>
          <DashboardActions />
        </>
      ) : (
        <>
          <Typography variant="p">
            You haven't set up your profile yet, want to do that now?
          </Typography>
          <Button
            color="primary"
            variant="contained"
            size="small"
            disableElevation
          >
            <CustomLink to="/create-profile" color="white">
              Let's go!
            </CustomLink>
          </Button>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);