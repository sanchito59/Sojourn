import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Breadcrumbs, CircularProgress, Typography } from "@material-ui/core";
import SinglePost from "../Posts/components/SinglePost";
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
      <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "40px" }}>
        <CustomLink color="inherit" to="/posts">
          Posts
        </CustomLink>
        <Typography color="textPrimary">TITLE WILL GO HERE</Typography>
      </Breadcrumbs>
      <SinglePost showActions={false} post={post} />
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
