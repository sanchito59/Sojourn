import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import { Badge, Button, Grid, IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CustomLink from "../../atoms/CustomLink";
import CustomPaper from "../../atoms/CustomPaper";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../../actions/post";

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 100px;
  height: auto;
  object-fit: cover;
`;

const Post = ({
  addLike,
  removeLike,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (
    <Grid item sm={12} xs={12}>
      <CustomPaper padding="12" marginTop="20px">
        <Grid container>
          <Grid item sm={2} xs={2} align="center">
            <ProfilePicture src={avatar} alt={`Profile picture for ${name}`} />
            <Typography variant="body2">{name}</Typography>
          </Grid>
          <Grid item sm={10} xs={10}>
            <Grid container>
              <Grid item sm={12} xs={12}>
                {text}
              </Grid>
              <Grid item sm={12} xs={12}>
                Posted on {moment(date).format("ddd MMM, Do - hh:ma")}
              </Grid>
              <Grid item sm={12} xs={12} style={{ display: "flex" }}>
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
                <Button variant="contained" color="primary">
                  <CustomLink to={`posts/${_id}`} color="white">
                    {comments.length > 0
                      ? `Comments (${comments.length})`
                      : "no comments"}
                  </CustomLink>
                </Button>
                {!auth.loading && user === auth.user._id && (
                  <IconButton variant="outlined" color="secondary">
                    <DeleteForeverIcon onClick={() => alert("no.")} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CustomPaper>
    </Grid>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addLike, removeLike })(Post);
