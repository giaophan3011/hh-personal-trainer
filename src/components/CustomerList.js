import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import SearchIcon from '@material-ui/icons/Search';
import {Tooltip, Toolbar, InputBase} from '@material-ui/core';
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const Row  = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [trainings, setTrainings] = useState([]);

  const handleClick = (fetchTrainings) => {
    setOpen(!open);
    if (fetchTrainings) {
      const trainingLink  = row.links.find(element => element.rel=="trainings").href;
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
              <Typography variant="h6" gutterBottom component="div">
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
                  {trainings.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.activity}
                      </TableCell>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell align="right">{historyRow.duration}</TableCell>
                    
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

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('firstname');
  const [searchValue, setSearchValue] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const getCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
    .then(response => response.json())
    .then(data => setCustomers(data.content));
  }

  useEffect(getCustomers, []);


  return (
    <div>
      <EnhancedTableToolbar handleSearch={setSearchValue}/>
    
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {
              tableHeaders.map(header =>
                <TableCell>
                <TableSortLabel
                active={orderBy === header.id}
                direction={order}
                onClick={() =>handleRequestSort(header.id)}
              >
                {header.label}                
              </TableSortLabel>
              </TableCell>)
            }
           
            
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(searchValue === '' ? customers 
          : customers.filter(customer => customer.firstname.includes(searchValue) || customer.lastname.includes(searchValue) || customer.streetaddress.includes(searchValue) || customer.email.includes(searchValue) || customer.city.includes(searchValue) || customer.postcode.includes(searchValue) || customer.phone.includes(searchValue)) 
          , getComparator(order, orderBy)).map((row) => (
            <Row key={row.email} row={row} />
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default CustomerList;

const EnhancedTableToolbar = (props) => {
 

  return (
    <Toolbar>
     <Typography
     style={{flex: '1 1 100%', textAlign: "left"}}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Customers
        </Typography>
        <div style={{backgroundColor: "white",display: 'flex',}}>
            <SearchIcon style={{marginLeft: 2, marginTop: 3, marginRight: 5}}/>            
            <InputBase
              placeholder="Search…"  
              onChange={event=>{                                 //adding the onChange event
                props.handleSearch(event.target.value)
              }}  
            />
          </div>       
    </Toolbar>
  );
};

