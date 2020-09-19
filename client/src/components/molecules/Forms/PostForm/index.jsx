import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  Button,
  Box,
  Container,
  TextField,
  Typography,
  FormControl,
} from "@material-ui/core";
import { addPost } from "../../../../actions/post";

const CallToAction = styled(Typography)`
  @media only screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

const PostForm = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  return (
    <Container>
      <Box my={4}>
        <CallToAction variant="h4" component="h1" paragraph>
          Find something interesting?
        </CallToAction>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ title, text });
            setText("");
            setTitle("");
          }}
        >
          <FormControl style={{ marginBottom: "16px" }}>
            <TextField
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              label="Post Title"
              placeholder="What'd you find?"
            />
          </FormControl>
          <textarea
            type="text"
            placeholder="Post it here!"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "90%", height: "200px" }}
          />
          <br />
          <Button
            variant="outlined"
            type="submit"
            style={{ marginTop: "16px" }}
          >
            Share it!
          </Button>
        </form>
      </Box>
    </Container>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
