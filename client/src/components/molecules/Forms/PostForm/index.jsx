import React, { useState, useForm } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Box, Container, Typography } from "@material-ui/core";
import { addPost } from "../../../../actions/post";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" paragraph>
          Find something interesting?
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text });
            setText("");
          }}
        >
          <textarea
            type="text"
            placeholder="Post it here!"
            name=""
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
