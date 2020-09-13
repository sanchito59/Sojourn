import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Container,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import DashboardActions from "../../molecules/DashboardActions";
import CustomLink from "../../atoms/CustomLink";
import ExperienceList from "../../molecules/ExperienceList";
import EducationList from "../../molecules/EducationList";
import WeatherForecast from "../../organisms/WeatherForecast";
import { getCurrentProfile, deleteAccount } from "../../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <CircularProgress />
  ) : (
    <Container maxWidth="lg" style={{ marginBottom: "40px" }}>
      <Typography variant="h3" component="h1" style={{ textAlign: "center" }}>
        Dashboard
      </Typography>
      {profile !== null ? (
        <>
          <Typography variant="h4">Welcome, {user && user.name}</Typography>
          {profile.location && (
            <Grid container style={{ display: "flex" }}>
              <Grid
                gridItem
                sm={2}
                xs={6}
                align="center"
                style={{ marginTop: "40px", marginRight: "20px" }}
              >
                <WeatherForecast city={profile.location} />
              </Grid>
              <Grid gridItem style={{ marginTop: "40px" }}>
                <DashboardActions />
              </Grid>
            </Grid>
          )}
          {profile.experience.length > 0 && (
            <ExperienceList experience={profile.experience} />
          )}
          {profile.education.length > 0 && (
            <EducationList education={profile.education} />
          )}
          {/* @TODO: POPOVER/MODAL INSTEAD OF WINDOW CONFIRM */}
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
    </Container>
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
