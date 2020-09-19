import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Box,
  Breadcrumbs,
  Container,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import SinglePost from "../Posts/components/SinglePost";
import CommentForm from "../../molecules/Forms/CommentForm";
import Comment from "./components/Comment";
import CustomLink from "../../atoms/CustomLink";
import { getPost } from "../../../actions/post";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <CircularProgress />
  ) : (
    <>
      <Container>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "40px" }}>
          <CustomLink color="inherit" to="/posts">
            Posts
          </CustomLink>
          <Typography color="textPrimary">{post.title}</Typography>
        </Breadcrumbs>
      </Container>
      <SinglePost showActions={false} post={post} />
      <CommentForm postId={post._id} />
      <Container>
        <Box my={4}>
          {post.comments.map((comment) => {
            return <Comment postId={post._id} comment={comment} />;
          })}
        </Box>
      </Container>
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
