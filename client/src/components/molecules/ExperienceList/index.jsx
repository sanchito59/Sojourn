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

const ExperienceList = ({ experience }) => {
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

ExperienceList.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default connect()(ExperienceList);
