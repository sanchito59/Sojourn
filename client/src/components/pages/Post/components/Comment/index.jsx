import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CustomLink from "../../../../atoms/CustomLink";
import { deleteComment } from "../../../../../actions/post";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "108ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const Comment = ({
  auth,
  postId,
  deleteComment,
  comment: { _id, avatar, date, name, text, user },
}) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start" style={{ width: "100%" }}>
        <ListItemAvatar>
          <CustomLink to={`explorer/${user}`} color="white">
            <Avatar alt={name} src={avatar} />
          </CustomLink>
        </ListItemAvatar>
        <ListItemText
          primary={text}
          secondary={
            <>
              <Typography
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {name}
              </Typography>
              <br />
              <Typography variant="caption">
                {moment(date).format("ddd MMM Do | hh:mma")}
              </Typography>
              {!auth.loading && user === auth.user._id && (
                <IconButton variant="outlined" color="secondary">
                  <DeleteForeverIcon
                    onClick={() => deleteComment(postId, _id)}
                  />
                </IconButton>
              )}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

Comment.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(Comment);
