import React from "react";
import { Button } from "@material-ui/core";
import CustomLink from "../../atoms/CustomLink";

const DashboardActions = () => {
  return (
    <div>
      <Button color="primary" variant="contained" size="small">
        <CustomLink to="/edit-profile" color="white">
          Edit Profile
        </CustomLink>
      </Button>
      <Button color="primary" variant="contained" size="small">
        <CustomLink to="/add-experience" color="white">
          Add Experience
        </CustomLink>
      </Button>
      <Button color="primary" variant="contained" size="small">
        <CustomLink to="add-education" color="white">
          Add Education
        </CustomLink>
      </Button>
    </div>
  );
};

export default DashboardActions;
