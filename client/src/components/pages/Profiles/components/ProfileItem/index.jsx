import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import CustomLink from "../../../../atoms/CustomLink";
import CustomPaper from "../../../../atoms/CustomPaper";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    location,
    hobbies,
  },
}) => {
  console.log(avatar);
  return (
    <div style={{ marginTop: "20px" }}>
      <Card>
        <CardHeader title={name} subheader={status} />
        <CardContent>
          <>
            <CardMedia
              style={{ width: "100px", height: "100px" }}
              image={avatar}
            />
            <Button color="primary">
              <CustomLink to={`/profile/${_id}`}> View Profile</CustomLink>
            </Button>
          </>
          <Typography variant="body2" color="textSecondary" component="p">
            <List style={{ display: "flex", justifyContent: "center" }}>
              {hobbies.slice(0, 4).map((hobby) => {
                return (
                  <ListItem
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "0px",
                    }}
                    key={hobby}
                  >
                    {hobby}{" "}
                  </ListItem>
                );
              })}
            </List>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
