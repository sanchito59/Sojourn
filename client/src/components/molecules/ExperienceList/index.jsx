import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import CustomPaper from "../../atoms/CustomPaper";
import { deleteExperience } from "../../../actions/profile";

const ExperienceList = ({ experience, deleteExperience, privateView }) => {
  return (
    <CustomPaper marginTop="20">
      <TableContainer>
        <Table aria-label="Work Experience Table">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Years</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experience.map((exp) => {
              return (
                <TableRow key={exp._id}>
                  <TableCell component="th" scope="row">
                    {exp.company}
                  </TableCell>
                  <TableCell>{exp.title}</TableCell>
                  <TableCell>
                    <Moment format="MMMM Do YYYY">{exp.from}</Moment> -{" "}
                    {exp.to === null ? (
                      " Now"
                    ) : (
                      <Moment format="MMMM Do YYYY">{exp.to}</Moment>
                    )}
                  </TableCell>
                  {!privateView && (
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteExperience(exp._id)}
                      >
                        DELETE
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomPaper>
  );
};

ExperienceList.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  privateView: PropTypes.bool,
};

ExperienceList.defaultProps = {
  privateView: false,
};

export default connect(null, { deleteExperience })(ExperienceList);
