import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import CustomLink from "../../atoms/CustomLink";
import CustomPaper from "../../atoms/CustomPaper";
import { getProfileById } from "../../../actions/profile";
import ExperienceList from "../../molecules/ExperienceList";
import EducationList from "../../molecules/EducationList";

const ProfilePicture = styled.img`
  border-radius: 50%;
  border: 4px solid #8a8989;
  width: 120px;
  height: auto;
  object-fit: cover;
`;

const WebsiteLink = styled.a`
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const Profile = ({
  match,
  auth,
  getProfileById,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return loading || profile === null ? (
    <CircularProgress />
  ) : (
    <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "40px" }}>
        <CustomLink color="inherit" to="/explorers">
          Explorers
        </CustomLink>
        {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === profile.user._id && (
            <CustomLink to="/edit-profile">Edit My Profile</CustomLink>
          )}
        <Typography color="textPrimary">{profile.user.name}</Typography>
      </Breadcrumbs>
      <CustomPaper padding="8" marginTop="40">
        <Box my={4}>
          <Grid container>
            <Grid gridItem sm={4} align="center">
              <ProfilePicture
                src={profile.user.avatar}
                alt={`Profile picture for ${profile.user.name}`}
              />
              <br />
              {profile.website && (
                <WebsiteLink
                  href={profile.website}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {profile.website}
                </WebsiteLink>
              )}
            </Grid>
            <Grid
              gridItem
              sm={4}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                {profile.user.name}
              </Typography>
            </Grid>
            <Grid
              gridItem
              sm={4}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                {profile.location}
              </Typography>
            </Grid>
            <Grid gridItem sm={12}>
              <Typography variant="body1" align="center">
                {profile.bio}
              </Typography>
            </Grid>
            <Grid gridItem sm={12}></Grid>
            {profile.hobbies.length > 0 && (
              <Grid gridItem sm={12}>
                <Typography variant="h5">Hobbies</Typography>
                <List>
                  {profile.hobbies.map((hobby) => {
                    return (
                      <ListItem>
                        <ListItemText primary={hobby} />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            )}
            {profile.education.length > 0 && (
              <Grid gridItem sm={12}>
                <Typography variant="h5">Education</Typography>
                <EducationList education={profile.education} privateView />
              </Grid>
            )}
            {profile.experience.length > 0 && (
              <Grid gridItem sm={12}>
                <Typography variant="h5">Experience</Typography>
                <ExperienceList experience={profile.experience} privateView />
              </Grid>
            )}
          </Grid>
        </Box>
      </CustomPaper>
    </Container>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
