import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Box, Container, Typography } from "@material-ui/core";
import { addComment } from "../../../../actions/post";

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState("");

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" paragraph>
          Leave a response!
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addComment(postId, { text });
            setText("");
          }}
        >
          <textarea
            type="text"
            placeholder="Post it here..."
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
            Post Comment
          </Button>
        </form>
      </Box>
    </Container>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
