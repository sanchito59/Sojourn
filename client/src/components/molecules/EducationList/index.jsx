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
import { deleteEducation } from "../../../actions/profile";

const EducationList = ({ education, deleteEducation, privateView }) => {
  return (
    <CustomPaper marginTop="20">
      <TableContainer>
        <Table aria-label="Education Table">
          <TableHead>
            <TableRow>
              <TableCell>School</TableCell>
              <TableCell>Degree</TableCell>
              <TableCell>Years</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {education.map((edu) => {
              return (
                <TableRow key={edu._id}>
                  <TableCell component="th" scope="row">
                    {edu.school}
                  </TableCell>
                  <TableCell>{edu.degree}</TableCell>
                  <TableCell>
                    <Moment format="MMMM Do YYYY">{edu.from}</Moment> -{" "}
                    {edu.to === null ? (
                      " Now"
                    ) : (
                      <Moment format="MMMM Do YYYY">{edu.to}</Moment>
                    )}
                  </TableCell>
                  {!privateView && (
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteEducation(edu._id)}
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

EducationList.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  privateView: PropTypes.bool,
};

EducationList.defaultProps = {
  privateView: false,
};

export default connect(null, { deleteEducation })(EducationList);
