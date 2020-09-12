import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import DashboardActions from "../../molecules/DashboardActions";
import CustomLink from "../../atoms/CustomLink";
import ExperienceList from "../../molecules/ExperienceList";
import EducationList from "../../molecules/EducationList";
import { getCurrentProfile, deleteAccount } from "../../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
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
          <ExperienceList experience={profile.experience} />
          <EducationList education={profile.education} />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteForever />}
            onClick={() => deleteAccount()}
          >
            DELETE ACCOUNT
          </Button>
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
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
