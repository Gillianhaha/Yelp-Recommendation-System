import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';


const DisplayResultTable = ({resultList}) => {
  const TABLE_HEADER = ["Name", "Latitude", "Longitude", "Star Rate"];

  if (!resultList || resultList.length === 0) {
    return  null;
  }

  return (
      <TableContainer component={Box}>
      <Table aria-label="simple table">
      <TableHead>
      <TableRow>
        {TABLE_HEADER.map((header) => (<TableCell>{header}</TableCell>))}
      </TableRow>
      </TableHead>
        <TableBody>
          {resultList.map((row) => (
              <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.latitude}</TableCell>
                <TableCell align="right">{row.longitude}</TableCell>
                <TableCell align="right"><Rating name="read-only" value={parseFloat(row.star)} readOnly precision={0.1} /></TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
  );
};



export default DisplayResultTable;
