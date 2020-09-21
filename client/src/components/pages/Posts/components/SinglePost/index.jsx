import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import { Badge, Button, Grid, IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ExploreIcon from "@material-ui/icons/Explore";
import MapComponent from "../../../../molecules/MapComponent";
import RoomIcon from "@material-ui/icons/Room";
import CustomLink from "../../../../atoms/CustomLink";
import CustomPaper from "../../../../atoms/CustomPaper";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addLike, removeLike, deletePost } from "../../../../../actions/post";

const PostTitle = styled(Typography)`
  @media only screen and (max-width: 767px) {
    font-size: 1rem;
  }
`;

const PostText = styled(Typography)`
  @media only screen and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

const UserName = styled(Typography)`
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 100px;
  height: auto;
  object-fit: cover;

  @media only screen and (max-width: 767px) {
    width: 50px;
  }
`;

const SinglePost = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  showActions,
  displayMap,
  post: {
    _id,
    title,
    text,
    latitude,
    longitude,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
  },
}) => {
  const history = useHistory();

  return (
    <Grid item sm={12} xs={12} style={{ marginBottom: "40px" }}>
      <CustomPaper padding="12" marginTop="20px">
        <Grid container>
          <Grid item sm={2} xs={2} align="center">
            <CustomLink to={`/explorer/${user}`} color="white">
              <ProfilePicture
                src={avatar}
                alt={`Profile picture for ${name}`}
              />
            </CustomLink>
            <UserName variant="body2">{name}</UserName>
          </Grid>
          <Grid item sm={10} xs={10}>
            <Grid container>
              <Grid item sm={12} xs={12} style={{ display: "flex" }}>
                <CustomLink to={`/posts/${_id}`}>
                  <PostTitle variant="h6">{title}</PostTitle>
                </CustomLink>
                {latitude && longitude && (
                  <span style={{ marginLeft: "8px" }}>
                    <ExploreIcon
                      style={{ marginTop: "4px", color: "rgb(106, 106, 106)" }}
                    />
                    <RoomIcon
                      style={{
                        marginTop: "4px",
                        color: "rgba(223, 43, 43, 0.87)",
                      }}
                    />
                  </span>
                )}
              </Grid>
              <Grid item sm={12} xs={12} style={{ marginBottom: "32px" }}>
                <PostText variant="body2" noWrap>
                  {text}
                </PostText>
              </Grid>
              <Grid item sm={12} xs={12} style={{ marginTop: "-14px" }}>
                <Typography variant="caption">
                  Posted on {moment(date).format("ddd MMM Do | hh:mma")}
                </Typography>
              </Grid>
              <Grid
                item
                sm={12}
                xs={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconButton color="secondary" onClick={() => addLike(_id)}>
                  <Badge badgeContent={likes.length} color="secondary">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <IconButton color="secondary" onClick={() => removeLike(_id)}>
                  <Badge color="secondary">
                    <FavoriteBorderIcon />
                  </Badge>
                </IconButton>
                {showActions && (
                  <Button
                    variant="contained"
                    size="small"
                    style={{ height: "24px" }}
                  >
                    <CustomLink to={`posts/${_id}`} color="white">
                      {comments.length > 0
                        ? `Comments (${comments.length})`
                        : "no comments"}
                    </CustomLink>
                  </Button>
                )}
                {!auth.loading && user === auth.user._id && (
                  <IconButton variant="outlined" color="secondary">
                    <DeleteForeverIcon
                      onClick={() => {
                        deletePost(_id);
                        history.push("/posts");
                      }}
                    />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {displayMap && latitude && longitude && (
          <MapComponent
            markers={[{ lat: latitude, lng: longitude }]}
            latitude={latitude}
            longitude={longitude}
            zoom={13}
          />
        )}
      </CustomPaper>
    </Grid>
  );
};

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  displayMap: PropTypes.bool,
};

SinglePost.defaultProps = {
  showActions: true,
  displayMap: true,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  SinglePost
);
