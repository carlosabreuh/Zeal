import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {},
});


export default function StatusTable({ tableRows, myCharities, setMyCharities, page }) {
  const classes = useStyles();

  const handleClick = (newCharity) => {
    console.log(newCharity);
    console.log(newCharity);
    buttonFunc(newCharity)
    
  }

  let buttonName, buttonFunc;


  if(page === "MyCharities") {
    buttonFunc = (newCharity) => setMyCharities ((state) => state.filter((charity) => newCharity.ein !== charity.ein ))
    buttonName = "Remove"
  } else if (page === "Resources") {
    buttonFunc = (newCharity) =>  { 
      console.log(tableRows);
      let test = tableRows.includes((ch) => ch.ein!==newCharity.ein)
      console.log(test);
      if(test){
        setMyCharities((state) => [...state, newCharity]);
      } 
     }
    buttonName = "Add";
  }
//myCharities.includes((ch) => ch.ein!==newCharity.ein) && setMyCharities ((state) => [...state, newCharity])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Services</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>keep</TableCell>
          </TableRow>
        </TableHead>
        {/* Table Contents */}
        <TableBody>
          {tableRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component='th' scope='row'>
                <Link target='_blank' href={row.websiteURL || row.charityNavigatorURL}>
                  {row.name}
                </Link>
              </TableCell>
              <TableCell>{row.numSites}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.statusUpdatedAt}</TableCell>
              <TableCell onClick={() => handleClick (row)} >{buttonName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
