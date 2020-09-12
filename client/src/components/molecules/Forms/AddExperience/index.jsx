import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  Checkbox,
  Typography,
  TextField,
  InputAdornment,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import styled from "styled-components";
import CustomLink from "../../../atoms/CustomLink";
import CustomPaper from "../../../atoms/CustomPaper";
import { addExperience } from "../../../../actions/profile";
import { useHistory } from "react-router-dom";

const TextArea = styled.textarea`
  width: 260px;
  height: 70px;
`;

const AddExperience = ({ addExperience }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [currentlyEmployed, setCurrentlyEmployed] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    addExperience(formData, history);
  };

  return (
    <Container>
      <CustomPaper elevation={1} padding={20} mt="40px">
        <Box my={4}>
          <Typography variant="h4" component="h1" paragraph>
            Add Experience
          </Typography>
          <form onSubmit={(e) => onSubmit(e)}>
            <FormControl style={{ marginRight: "8px" }}>
              <TextField
                type="text"
                placeholder="* Job Title"
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
                required
              />
            </FormControl>
            <FormControl style={{ marginRight: "8px" }}>
              <TextField
                type="text"
                placeholder="* Company"
                name="company"
                value={company}
                onChange={(e) => onChange(e)}
                required
              />
            </FormControl>
            <FormControl style={{ marginRight: "8px" }}>
              <TextField
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl style={{ marginRight: "8px" }}>
              <Typography component="h4">From Date</Typography>
              <TextField
                type="date"
                name="from"
                value={from}
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl style={{ marginRight: "8px" }}>
              <p>
                <Checkbox
                  name="current"
                  value={current}
                  checked={current}
                  onChange={(e) => {
                    setFormData({ ...formData, current: !current });
                    setCurrentlyEmployed(!currentlyEmployed);
                  }}
                />
                Current Job
              </p>
            </FormControl>
            <FormControl style={{ marginRight: "4px" }}>
              <Typography component="h4">To Date</Typography>
              <TextField
                type="date"
                name="to"
                value={to}
                onChange={(e) => onChange(e)}
                disabled={currentlyEmployed ? "disabled" : ""}
              />
            </FormControl>
            <FormControl style={{ marginRight: "8px" }}>
              <TextArea
                name="description"
                cols="30"
                rows="5"
                placeholder="Job Description"
                value={description}
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <TextField
              type="submit"
              value="Save Changes"
              style={{ marginTop: "16px" }}
            />
            <Typography variant="h6" paragraph>
              <CustomLink to="/Dashboard">Go back</CustomLink>
            </Typography>
          </form>
        </Box>
      </CustomPaper>
    </Container>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
