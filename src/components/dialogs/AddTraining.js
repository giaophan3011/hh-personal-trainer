import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {  DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from "../../redux/actions/dialogActions";

const initialState = {
    training: {   
        date:  undefined,
        activity: "",
        duration: "",
        customer : ""
     } 
}

export default function AddTrainingDialog() {
  const [newTraining, setNewTraining]= React.useState(initialState.training);
  const dispatch = useDispatch();
  const dialogState = useSelector(state => state.dialogReducer); 

  const handleClose = () => {
    dispatch(closeDialog())
    setNewTraining(initialState.training);
  };

  const handleTextFieldChange = (event) => {      
      setNewTraining({...newTraining, [event.target.id]: event.target.value})
  }

  const addTraining = () => {
      newTraining.customer = dialogState.dialogData.links.find(element => element.rel === "self").href;
      if (newTraining.date === undefined || newTraining.date === null) newTraining.date =  new Date(Date.now()).toISOString(); 
    fetch("https://customerrest.herokuapp.com/api/trainings", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.

        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTraining) // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  return (
   <Dialog open={dialogState.dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add training</DialogTitle>
        <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker    
          id="date" value={newTraining.date} onChange={(value) => {
              console.log(value)
              setNewTraining({...newTraining, date: value})}
            }
        />
      </MuiPickersUtilsProvider>
          <TextField
            autoFocus
            margin="dense"
            id="activity"
            label="Activity"
            type="text"
            fullWidth
            value={newTraining.lastname}
            onChange={handleTextFieldChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="duration"
            label="Duration"
            type="number"
            fullWidth
            value={newTraining.duration}
            onChange={handleTextFieldChange}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            addTraining();
            handleClose();
          }} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
   
  );
}