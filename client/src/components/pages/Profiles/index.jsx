import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  CircularProgress,
  Container,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { getProfiles } from "../../../actions/profile";
import ProfileItem from "./components/ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return loading && profiles === null ? (
    <CircularProgress />
  ) : (
    <Container>
      <Box my={4} align="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Explorers
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <Grid item xs={12} sm={4}>
              <Box my={4} align="center">
                <ProfileItem key={profile._id} profile={profile} />
              </Box>
            </Grid>
          ))
        ) : (
          <Typography component="h4">No users found...</Typography>
        )}
      </Grid>
    </Container>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
