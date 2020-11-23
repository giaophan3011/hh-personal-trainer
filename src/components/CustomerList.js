import React, { useEffect, useState } from "react";
import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, TextField, Button } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EnhancedTable from "./EnhancedTable";
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteButton from "./DeleteButton"
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import AddTrainingDialog from "./AddTrainingDialog"


const Row  = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [trainings, setTrainings] = useState([]);
  const [customer, setCustomer]= React.useState(row);
 

  const editCustomer = () => {
    if(isInEditMode) {
    fetch(row.links.find(element => element.rel === "self").href, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .catch(error => console.log(error));
  }
  props.setEditRowId(null);
}

const deleteCustomer = () => {
  fetch(row.links.find(element => element.rel === "self").href, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    } // body data type must match "Content-Type" header
  })
  .then(response => response.json())
  .catch(error => console.log(error));
}

const deleteTraining = (training) => {
  fetch(training.links.find(element => element.rel === "self").href, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    } // body data type must match "Content-Type" header
  })
  .then(response => response.json())
  .catch(error => console.log(error));
}


  const handleTextFieldChange = (event) => {
    console.log(event)
    setCustomer({...customer, [event.target.id]: event.target.value})
}

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

  const isInEditMode = row.email === props.editRowId;

  return (
    <React.Fragment>
      
        {
          isInEditMode 
          ? (
          <TableRow>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => handleClick(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
          <TextField
              autoFocus
              margin="dense"
              id="firstname"           
              type="text"
              fullWidth
              value={customer.firstname}          
              onChange={handleTextFieldChange}
            />
          </TableCell>
          <TableCell><TextField
              autoFocus
              margin="dense"
              id="lastname"           
              type="text"
              fullWidth
              value={customer.lastname}          
              onChange={handleTextFieldChange}
            /></TableCell>
          <TableCell><TextField
              autoFocus
              margin="dense"
              id="streetaddress"           
              type="text"
              fullWidth
              value={customer.streetaddress}          
              onChange={handleTextFieldChange}
            /></TableCell>
          <TableCell><TextField
              autoFocus
              margin="dense"
              id="postcode"           
              type="text"
              fullWidth
              value={customer.postcode}          
              onChange={handleTextFieldChange}
            /></TableCell>
          <TableCell><TextField
              autoFocus
              margin="dense"
              id="city"           
              type="text"
              fullWidth
              value={customer.city}          
              onChange={handleTextFieldChange}
            /></TableCell>
          <TableCell><TextField
              autoFocus
              margin="dense"
              id="email"           
              type="email"
              fullWidth
              value={customer.email}          
              onChange={handleTextFieldChange}
            /></TableCell>
          <TableCell><TextField
              autoFocus
              margin="dense"
              id="phone"           
              type="text"
              fullWidth
              value={customer.phone}          
              onChange={handleTextFieldChange}
            /></TableCell>
          <TableCell><DoneIcon size="small" onClick={editCustomer}/>   <ClearIcon color="secondary" onClick={() => props.setEditRowId(null)}/></TableCell>
        </TableRow>)
          : (
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
            <TableCell><EditIcon size="small" onClick={() => props.setEditRowId(row.email)}/>  <DeleteButton handleDelete = {deleteCustomer} title ="Delete customer" deletedObject = {` customer ${row.firstname} ${row.lastname}`} /></TableCell>
          </TableRow>)
        }
        
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
                      <TableCell><DeleteButton handleDelete = {() => deleteTraining(el)} deletedObject={`activity ${el.activity}`} title ="Delete training" /></TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                  <AddTrainingDialog customer={row}/>
                  </TableRow>
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
  const [editRowId, setEditRowId] = useState(null);

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
      mapFunction={(row) =>  <Row key={row.email} row={row} setEditRowId={setEditRowId} editRowId={editRowId}/>}
      filterFunction={(row, searchValue) => row.firstname.includes(searchValue) || row.lastname.includes(searchValue) || row.streetaddress.includes(searchValue) || row.email.includes(searchValue) || row.city.includes(searchValue) || row.postcode.includes(searchValue) || row.phone.includes(searchValue)}/>
    </div>
  );
};

export default CustomerList;
