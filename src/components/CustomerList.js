import React, { useEffect, useState } from "react";
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TextField,
  CircularProgress,
  Button,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EnhancedTable from "./EnhancedTable";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch, useSelector } from "react-redux";
import { displayAddTrainingDialog, displayConfirmDialog } from "../redux/actions/dialogActions";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  getCustomersMiddleware,
  editCustomerMiddleware,
  deleteCustomerMiddleware,
} from "../redux/middleware/customerMiddleware";
import { getTrainings, deleteTraining } from "../services/trainingApi";

const Row = (props) => {
  const dispatch = useDispatch();
  const { row, setEditRowId } = props;
  const [open, setOpen] = React.useState(false);
  const [trainings, setTrainings] = useState([]);
  const [customer, setCustomer] = React.useState(row);

  const handleEditCustomer = async () => {
    if (isInEditMode) {
      dispatch(editCustomerMiddleware(customer));
    }
    setEditRowId(null);
  };

  const handleDeleteCustomer = async () => {
    dispatch(deleteCustomerMiddleware(row));
  };

  const handleDeleteTraining = async (training) => {
    try {
      await deleteTraining(training);
      await handleFetchTrainings();
    } catch (err) {
      console.log("handleDeleteTraining", err);
    }
  };

  const handleFetchTrainings = async () => {
    const trainingLink = row.links.find((element) => element.rel === "trainings").href;
    try {
      let data = await getTrainings(trainingLink);
      setTrainings(data.content);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextFieldChange = (event) => {
    setCustomer({ ...customer, [event.target.id]: event.target.value });
  };

  const handleClick = async (fetchTrainings) => {
    setOpen(!open);
    if (fetchTrainings) {
      await handleFetchTrainings();
    }
  };

  const isInEditMode = row.email === props.editRowId;

  return (
    <React.Fragment>
      {isInEditMode ? (
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
          <TableCell>
            <TextField
              autoFocus
              margin="dense"
              id="lastname"
              type="text"
              fullWidth
              value={customer.lastname}
              onChange={handleTextFieldChange}
            />
          </TableCell>
          <TableCell>
            <TextField
              autoFocus
              margin="dense"
              id="streetaddress"
              type="text"
              fullWidth
              value={customer.streetaddress}
              onChange={handleTextFieldChange}
            />
          </TableCell>
          <TableCell>
            <TextField
              autoFocus
              margin="dense"
              id="postcode"
              type="text"
              fullWidth
              value={customer.postcode}
              onChange={handleTextFieldChange}
            />
          </TableCell>
          <TableCell>
            <TextField
              autoFocus
              margin="dense"
              id="city"
              type="text"
              fullWidth
              value={customer.city}
              onChange={handleTextFieldChange}
            />
          </TableCell>
          <TableCell>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              type="email"
              fullWidth
              value={customer.email}
              onChange={handleTextFieldChange}
            />
          </TableCell>
          <TableCell>
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              type="text"
              fullWidth
              value={customer.phone}
              onChange={handleTextFieldChange}
            />
          </TableCell>
          <TableCell>
            <DoneIcon size="small" onClick={handleEditCustomer} />{" "}
            <ClearIcon color="secondary" onClick={() => props.setEditRowId(null)} />
          </TableCell>
        </TableRow>
      ) : (
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
          <TableCell>
            <EditIcon size="small" onClick={() => props.setEditRowId(row.email)} />
            <DeleteForeverIcon
              color="secondary"
              onClick={() =>
                dispatch(displayConfirmDialog("Delete customer", row, handleDeleteCustomer))
              }
            />
          </TableCell>
        </TableRow>
      )}

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
                  {trainings.map((el) => {
                    console.log(el);
                    return (
                      <TableRow key={el.date}>
                        <TableCell component="th" scope="row">
                          {el.activity}
                        </TableCell>
                        <TableCell>
                          {el.date != null ? moment(el.date).format("MMMM Do YYYY, h:mm:ss a") : ""}
                        </TableCell>
                        <TableCell>{el.duration}</TableCell>
                        <TableCell>
                          {el.activity === null || el.activity === undefined ? (
                            ""
                          ) : (
                            <DeleteForeverIcon
                              color="secondary"
                              onClick={() =>
                                dispatch(
                                  displayConfirmDialog("Delete training", el, handleDeleteTraining)
                                )
                              }
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <Button
                      color="primary"
                      size="small"
                      style={{ marginTop: 10, fontSize: 12 }}
                      onClick={() => dispatch(displayAddTrainingDialog(row))}
                    >
                      {" "}
                      Add training{" "}
                    </Button>
                    <Button
                      color="secondary"
                      size="small"
                      style={{ marginTop: 10, fontSize: 12 }}
                      onClick={() => handleFetchTrainings()}
                    >
                      {" "}
                      Reload{" "}
                    </Button>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const tableHeaders = [
  { id: "firstname", label: "First name" },
  { id: "lastname", label: "Last name" },
  { id: "streetaddress", label: "Street address" },
  { id: "postcode", label: "Post code" },
  { id: "city", label: "City" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
];

const CustomerList = () => {
  const [editRowId, setEditRowId] = useState(null);
  const [loading, setLoading] = useState(false);
  const customersState = useSelector((state) => state.customerReducer);
  const dispatch = useDispatch();

  const getCustomers = () => {
    dispatch(getCustomersMiddleware());
  };
  useEffect(getCustomers, []);

  return (
    <div style={{ justifyContent: "center" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <EnhancedTable
          tableName="Customers"
          headers={tableHeaders}
          rowData={customersState.customers}
          mapFunction={(row) => (
            <Row key={row.email} row={row} setEditRowId={setEditRowId} editRowId={editRowId} />
          )}
          filterFunction={(row, searchValue) =>
            row.firstname.includes(searchValue) ||
            row.lastname.includes(searchValue) ||
            row.streetaddress.includes(searchValue) ||
            row.email.includes(searchValue) ||
            row.city.includes(searchValue) ||
            row.postcode.includes(searchValue) ||
            row.phone.includes(searchValue)
          }
        />
      )}
    </div>
  );
};

export default CustomerList;
