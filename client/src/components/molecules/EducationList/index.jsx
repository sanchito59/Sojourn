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
  Typography,
} from "@material-ui/core";
import CustomPaper from "../../atoms/CustomPaper";

const EducationList = ({ education }) => {
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
                  <TableCell align="right">
                    <Button variant="contained" color="secondary">
                      DELETE
                    </Button>
                  </TableCell>
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
};

export default connect()(EducationList);
