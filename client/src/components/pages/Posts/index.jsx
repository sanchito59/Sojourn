import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../../actions/post";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import SinglePost from "./components/SinglePost";
import PostForm from "../../molecules/Forms/PostForm";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  console.log(posts);

  return loading ? (
    <CircularProgress />
  ) : (
    <Container maxWidth="md">
      <Box my={4} align="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Recent posts
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <PostForm />
        {posts.map((post) => {
          return <SinglePost key={post._id} post={post} />;
        })}
      </Grid>
    </Container>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Posts);
