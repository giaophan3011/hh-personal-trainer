import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../redux/actions/dialogActions";
import { getCustomersMiddleware } from "../../redux/middleware/customerMiddleware";
import { addTrainingMiddleware } from "../../redux/middleware/trainingMiddleware";

const initialState = {
  training: {
    date: undefined,
    activity: "",
    duration: "",
    customer: "",
    customerObj: "",
  },
};

export default function AddTrainingDialog() {
  const [newTraining, setNewTraining] = React.useState(initialState.training);
  const dispatch = useDispatch();
  const dialogState = useSelector((state) => state.dialogReducer);
  const customerState = useSelector((state) => state.customerReducer);
  const handleClose = () => {
    dispatch(closeDialog());
    setNewTraining(initialState.training);
  };
  const enableCustomerSelection =
    dialogState.dialogData === null || dialogState.dialogData === undefined;

  React.useEffect(() => dispatch(getCustomersMiddleware()), []);

  const handleTextFieldChange = (event) => {
    setNewTraining({ ...newTraining, [event.target.id]: event.target.value });
  };

  const addTraining = async () => {
    if (!enableCustomerSelection) {
      newTraining.customer = dialogState.dialogData.links.find(
        (element) => element.rel === "self"
      ).href;
    } else {
      newTraining.customer = newTraining.customerObj.links.find(
        (element) => element.rel === "self"
      ).href;
    }
    if (newTraining.date === undefined || newTraining.date === null)
      newTraining.date = new Date(Date.now()).toISOString();
    dispatch(addTrainingMiddleware(newTraining));
  };

  return (
    <Dialog open={dialogState.dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add training</DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            id="date"
            value={newTraining.date}
            onChange={(value) => {
              console.log(value);
              setNewTraining({ ...newTraining, date: value });
            }}
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
        {enableCustomerSelection ? (
          <FormControl style={{ minWidth: 240 }} id="customer">
            <InputLabel id="demo-simple-select-filled-label">Customer</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="customer"
              value={newTraining.customerObj}
              onChange={(event) => {
                console.log("value", event.target.value);
                setNewTraining({ ...newTraining, customerObj: event.target.value });
              }}
            >
              {customerState.customers.map((i) => (
                <MenuItem value={i}>
                  <em>{`${i.firstname} ${i.lastname}`}</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <div />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            addTraining();
            handleClose();
          }}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
