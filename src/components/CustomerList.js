import React, { useEffect, useState } from "react";
import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EnhancedTable from "./EnhancedTable";
import moment from 'moment';


const Row  = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [trainings, setTrainings] = useState([]);

  const handleClick = (fetchTrainings) => {
    setOpen(!open);
    if (fetchTrainings) {
      const trainingLink  = row.links.find(element => element.rel === "trainings").href;
      console.log(trainingLink)
      fetch(trainingLink)
      .then(response => response.json())
      .then(data=> setTrainings(data.content))
    }
  }

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => handleClick(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.firstname}
        </TableCell>
        <TableCell>{row.lastname}</TableCell>
        <TableCell>{row.streetaddress}</TableCell>
        <TableCell>{row.postcode}</TableCell>
        <TableCell>{row.city}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography gutterBottom component="div">
                Training
              </Typography>
              <Table size="small" aria-label="training">
                <TableHead>
                  <TableRow>
                    <TableCell>Activity</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trainings.map((el) => (
                    <TableRow key={el.date}>
                      <TableCell component="th" scope="row">
                        {el.activity}
                      </TableCell>
                      <TableCell>{el.date != null ? moment(el.date).format('MMMM Do YYYY, h:mm:ss a'): ""}</TableCell>
                      <TableCell >{el.duration}</TableCell>
                    
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> 
    </React.Fragment>
  );
}

const tableHeaders = [{id: "firstname", label: "First name"},
  {id: "lastname", label: "Last name"},
  {id: "streetaddress", label: "Street address"},
  {id: "postcode", label: "Post code"},
  {id: "city", label: "City"},
  {id: "email", label: "Email"},
  {id: "phone", label: "Phone"}  ];

const TrainingList = () => {
  const [customers, setCustomers] = useState([]);

  const getCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
    .then(response => response.json())
    .then(data => setCustomers(data.content));
  }
  useEffect(getCustomers, []);

  return (
    <div>
      <EnhancedTable 
      tableName="Customers" 
      headers={tableHeaders} 
      rowData={customers} 
      mapFunction={(row) =>  <Row key={row.email} row={row} />}
      filterFunction={(row, searchValue) => row.firstname.includes(searchValue) || row.lastname.includes(searchValue) || row.streetaddress.includes(searchValue) || row.email.includes(searchValue) || row.city.includes(searchValue) || row.postcode.includes(searchValue) || row.phone.includes(searchValue)}/>
    </div>
  );
};

export default TrainingList;
