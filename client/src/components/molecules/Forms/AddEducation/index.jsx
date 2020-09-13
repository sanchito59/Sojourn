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
  FormControl,
} from "@material-ui/core";
import { Book, School, Subject } from "@material-ui/icons";
import styled from "styled-components";
import CustomLink from "../../../atoms/CustomLink";
import CustomPaper from "../../../atoms/CustomPaper";
import { addEducation } from "../../../../actions/profile";
import { useHistory } from "react-router-dom";

const TextArea = styled.textarea`
  width: 260px;
  height: 70px;
`;

const AddEducation = ({ addEducation }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [currentlyEnrolled, setCurrentlyEntrolled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    addEducation(formData, history);
  };

  return (
    <Container>
      <CustomPaper elevation={1} padding={20} mt="40px">
        <Box my={4}>
          <Typography variant="h4" component="h1" paragraph>
            Add Education
          </Typography>
          <form onSubmit={(e) => onSubmit(e)}>
            <FormControl style={{ marginRight: "8px" }}>
              <TextField
                type="text"
                placeholder="* School"
                name="school"
                value={school}
                onChange={(e) => onChange(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <School />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </FormControl>
            <FormControl style={{ marginRight: "8px" }}>
              <TextField
                type="text"
                placeholder="* Degree or Certificate"
                name="degree"
                value={degree}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Subject />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => onChange(e)}
                required
              />
            </FormControl>
            <FormControl style={{ marginRight: "8px" }}>
              <TextField
                type="text"
                placeholder="Field of Study"
                name="fieldofstudy"
                value={fieldofstudy}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Book />
                    </InputAdornment>
                  ),
                }}
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
                    setCurrentlyEntrolled(!currentlyEnrolled);
                  }}
                />
                Currently Enrolled
              </p>
            </FormControl>
            <FormControl style={{ marginRight: "4px" }}>
              <Typography component="h4">To Date</Typography>
              <TextField
                type="date"
                name="to"
                value={to}
                onChange={(e) => onChange(e)}
                disabled={currentlyEnrolled ? "disabled" : ""}
              />
            </FormControl>
            <FormControl style={{ marginRight: "8px" }}>
              <TextArea
                name="description"
                cols="30"
                rows="5"
                placeholder="Program Description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
