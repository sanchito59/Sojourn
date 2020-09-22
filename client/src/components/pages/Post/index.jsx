import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Box,
  Breadcrumbs,
  Container,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import SinglePost from "../Posts/components/SinglePost";
import MapComponent from "../../molecules/MapComponent";
import CommentForm from "../../molecules/Forms/CommentForm";
import Comment from "./components/Comment";
import CustomLink from "../../atoms/CustomLink";
import { getPost } from "../../../actions/post";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  const columnSize = post?.latitude && post?.longitude ? 7 : 12;

  return loading || post === null ? (
    <CircularProgress />
  ) : (
    <>
      <Container>
        <Breadcrumbs aria-label="breadcrumb" style={{ margin: "40px 0px" }}>
          <CustomLink color="inherit" to="/posts">
            Posts
          </CustomLink>
          <Typography color="textPrimary">{post.title}</Typography>
        </Breadcrumbs>
      </Container>
      <Container>
        <Grid container>
          <Grid gridItem xs={12} lg={columnSize}>
            <SinglePost
              showActions={false}
              post={post}
              displayMap={false}
              noWrap={false}
            />
          </Grid>
          {post.latitude && post.longitude && (
            <Grid gridItem xs={12} sm={5}>
              <Container>
                <MapComponent
                  latitude={post.latitude}
                  longitude={post.longitude}
                  markers={[{ lat: post.latitude, lng: post.longitude }]}
                />
              </Container>
            </Grid>
          )}
        </Grid>
      </Container>
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
