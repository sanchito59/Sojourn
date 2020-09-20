import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
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

interface Provider {
  _id: string;
  school: string;
  degree: string;
  from: string;
  to: string;
}

const EducationList = ({
  education,
  deleteEducation,
  privateView,
}: {
  education: Array<Provider>;
  deleteEducation: Function;
  privateView: Boolean;
}) => {
  return (
    <CustomPaper>
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

EducationList.defaultProps = {
  privateView: false,
};

export default connect(null, { deleteEducation })(EducationList);
