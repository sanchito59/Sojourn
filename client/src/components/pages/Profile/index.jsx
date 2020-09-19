import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  Avatar,
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
import {
  Facebook,
  Twitter,
  LinkedIn,
  OndemandVideo,
  Instagram,
} from "@material-ui/icons";
import CustomLink from "../../atoms/CustomLink";
import CustomPaper from "../../atoms/CustomPaper";
import { getProfileById } from "../../../actions/profile";
import ExperienceList from "../../molecules/ExperienceList";
import EducationList from "../../molecules/EducationList";
import WeatherForecast from "../../organisms/WeatherForecast";

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

const InstagramAvatar = styled(Avatar)`
  background: -moz-linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background: -webkit-linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
`;

const http = "https://";
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
    <Container maxWidth="lg" style={{ marginBottom: "40px" }}>
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
      <CustomPaper elevation={1} padding="8" marginTop="40">
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
            {profile.social && (
              <Grid
                gridItem
                sm={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                {/* @TODO: FIX THIS D: */}
                {profile.social.facebook && (
                  <a
                    href={
                      profile.social.facebook.includes("http")
                        ? profile.social.facebook
                        : http + profile.social.facebook
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ marginRight: "8px" }}
                  >
                    <Avatar
                      style={{ color: "white", backgroundColor: "#4267B2" }}
                    >
                      <Facebook />
                    </Avatar>
                  </a>
                )}
                {profile.social.twitter && (
                  <a
                    href={
                      profile.social.twitter.includes("http")
                        ? profile.social.twitter
                        : http + profile.social.twitter
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ marginRight: "8px" }}
                  >
                    <Avatar
                      style={{ color: "white", backgroundColor: "#1da1f2" }}
                    >
                      <Twitter />
                    </Avatar>
                  </a>
                )}
                {profile.social.linkedin && (
                  <a
                    href={
                      profile.social.linkedin.includes("http")
                        ? profile.social.linkedin
                        : http + profile.social.linkedin
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ marginRight: "8px" }}
                  >
                    <Avatar
                      style={{ color: "white", backgroundColor: "#2867b2" }}
                    >
                      <LinkedIn />
                    </Avatar>
                  </a>
                )}
                {profile.social.youtube && (
                  <a
                    href={
                      profile.social.youtube.includes("http")
                        ? profile.social.youtube
                        : http + profile.social.youtube
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ marginRight: "8px" }}
                  >
                    <Avatar
                      style={{ color: "white", backgroundColor: "#FF0000" }}
                    >
                      <OndemandVideo />
                    </Avatar>
                  </a>
                )}
                {profile.social.instagram && (
                  <a
                    href={
                      profile.social.instagram.includes("http")
                        ? profile.social.instagram
                        : http + profile.social.instagram
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ marginRight: "8px" }}
                  >
                    <InstagramAvatar>
                      <Instagram />
                    </InstagramAvatar>
                  </a>
                )}
              </Grid>
            )}
            <Container style={{ display: "flex" }}>
              {profile.location && (
                <Grid
                  gridItem
                  sm={2}
                  xs={6}
                  align="center"
                  style={{ marginTop: "40px" }}
                >
                  <WeatherForecast city={profile.location} />
                </Grid>
              )}
              {profile.hobbies.length > 0 && (
                <Grid gridItem sm={12} xs={6}>
                  <CustomPaper elevation={1} padding="8" marginTop="40">
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
                  </CustomPaper>
                </Grid>
              )}
            </Container>
            {profile.education.length > 0 && (
              <Grid gridItem sm={12}>
                <CustomPaper elevation={1} padding="8" marginTop="40">
                  <Typography variant="h5">Education</Typography>
                  {/* @TODO: CREATE NEW COMPONENTS */}
                  <EducationList education={profile.education} privateView />
                </CustomPaper>
              </Grid>
            )}
            {profile.experience.length > 0 && (
              <Grid gridItem sm={12}>
                <CustomPaper elevation={1} padding="8" marginTop="40">
                  <Typography variant="h5">Experience</Typography>
                  <ExperienceList experience={profile.experience} privateView />
                </CustomPaper>
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
