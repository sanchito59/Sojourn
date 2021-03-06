import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import {
  Face,
  Facebook,
  Twitter,
  LinkedIn,
  OndemandVideo,
  Instagram,
} from "@material-ui/icons";
import styled from "styled-components";
import CustomLink from "../../../atoms/CustomLink";
import CustomPaper from "../../../atoms/CustomPaper";
import { createProfile } from "../../../../actions/profile";
import { useHistory } from "react-router-dom";

const TextArea = styled.textarea`
  width: 260px;
  height: 70px;
`;

const CreateProfile = ({ createProfile }) => {
  const history = useHistory();
  const [socialVisibility, setSocialVisibility] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    hobbies: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const {
    company,
    website,
    location,
    status,
    hobbies,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    createProfile(formData, history);
  };

  return (
    <>
      <Container>
        <CustomPaper elevation={1} padding={20} marginTop={40}>
          <Box my={4}>
            <Typography variant="h4" component="h1" paragraph>
              Create Your Profile
            </Typography>
            <Typography variant="h6" component="h2" paragraph>
              <Face /> Let's get to know each other!
            </Typography>
            <form onSubmit={(e) => onSubmit(e)}>
              <FormControl style={{ minWidth: "70px", marginRight: "8px" }}>
                {/* @TODO: styles */}
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={status}
                  onChange={(e) => onChange(e)}
                >
                  <MenuItem value="">* Select Status</MenuItem>
                  <MenuItem value="Guide">Guide</MenuItem>
                  <MenuItem value="Explorer">Explorer</MenuItem>
                  <MenuItem value="Wanderer">Wanderer</MenuItem>
                  <MenuItem value="Adventurer">Adventurer</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl style={{ marginRight: "8px" }}>
                <TextField
                  type="text"
                  placeholder="Company"
                  label="Company"
                  name="company"
                  value={company}
                  onChange={(e) => onChange(e)}
                />
              </FormControl>
              <FormControl style={{ marginRight: "8px" }}>
                <TextField
                  type="text"
                  placeholder="Website"
                  label="Website"
                  name="website"
                  value={website}
                  onChange={(e) => onChange(e)}
                />
              </FormControl>
              <FormControl style={{ marginRight: "8px" }}>
                <TextField
                  type="text"
                  placeholder="Denver, CO"
                  label="Location"
                  name="location"
                  value={location}
                  onChange={(e) => onChange(e)}
                />
              </FormControl>
              <FormControl style={{ marginRight: "8px" }}>
                <TextField
                  type="text"
                  label="* Hobbies"
                  placeholder="Hiking, knitting, singing"
                  name="hobbies"
                  value={hobbies}
                  onChange={(e) => onChange(e)}
                />
              </FormControl>
              <FormControl style={{ marginRight: "8px" }}>
                <TextArea
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={bio}
                  onChange={(e) => onChange(e)}
                />
              </FormControl>

              <div>
                <Button onClick={() => setSocialVisibility(!socialVisibility)}>
                  Add Social Links
                </Button>{" "}
                |<Button disabled>Optional</Button>
              </div>

              {socialVisibility && (
                <div style={{ marginTop: "8px" }}>
                  <FormControl style={{ marginRight: "8px" }}>
                    <TextField
                      type="text"
                      placeholder="Twitter URL"
                      name="twitter"
                      value={twitter}
                      onChange={(e) => onChange(e)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Twitter />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>

                  <FormControl style={{ marginRight: "8px" }}>
                    <TextField
                      type="text"
                      placeholder="Facebook URL"
                      name="facebook"
                      value={facebook}
                      onChange={(e) => onChange(e)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Facebook />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>

                  <FormControl style={{ marginRight: "8px" }}>
                    <TextField
                      type="text"
                      placeholder="YouTube URL"
                      name="youtube"
                      value={youtube}
                      onChange={(e) => onChange(e)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <OndemandVideo />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>

                  <FormControl style={{ marginRight: "8px" }}>
                    <TextField
                      type="text"
                      placeholder="Linkedin URL"
                      name="linkedin"
                      value={linkedin}
                      onChange={(e) => onChange(e)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkedIn />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>

                  <FormControl style={{ marginRight: "8px" }}>
                    <TextField
                      type="text"
                      placeholder="Instagram URL"
                      name="instagram"
                      value={instagram}
                      onChange={(e) => onChange(e)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Instagram />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </div>
              )}
              <TextField
                type="submit"
                value="Create Profile"
                style={{ marginTop: "16px" }}
              />
              <Typography variant="h6" paragraph>
                <CustomLink to="/Dashboard">Go back</CustomLink>
              </Typography>
            </form>
          </Box>
        </CustomPaper>
      </Container>
    </>
  );
};

export default connect(null, { createProfile })(CreateProfile);
