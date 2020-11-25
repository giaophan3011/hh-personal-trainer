import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from "../../redux/actions/dialogActions";
import { addCustomerMiddleware } from '../../redux/middleware/customerMiddleware';

const initialState = {
    customer: {
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
        }
}

export default function AddCustomerDialog() {
  const [newCustomer, setNewCustomer]= React.useState(initialState.customer);
  const dispatch = useDispatch();
  const dialogState = useSelector(state => state.dialogReducer); 

  const handleClose = () => {
    dispatch(closeDialog());
    setNewCustomer(initialState.customer);
  };

  const handleTextFieldChange = (event) => {
      setNewCustomer({...newCustomer, [event.target.id]: event.target.value})
  }

  const addCustomer = async () => {
    dispatch(addCustomerMiddleware(newCustomer));
  }

  return (
    <Dialog open={dialogState.dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            label="First name"
            type="text"
            fullWidth
            value={newCustomer.firstname}
            onChange={handleTextFieldChange}
          />
          <TextField
         
            margin="dense"
            id="lastname"
            label="Last name"
            type="text"
            fullWidth
            value={newCustomer.lastname}
            onChange={handleTextFieldChange}
          />
          <TextField
          
            margin="dense"
            id="streetaddress"
            label="Street address"
            type="text"
            fullWidth
            value={newCustomer.stressaddress}
            onChange={handleTextFieldChange}
          />
          <TextField
            
            margin="dense"
            id="postcode"
            label="Post code"
            type="text"
            fullWidth
            value={newCustomer.postcode}
            onChange={handleTextFieldChange}
          />
           <TextField
          
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
            value={newCustomer.city}
            onChange={handleTextFieldChange}
          />
          <TextField
          
            margin="dense"
            id="email"
            label="Email address"
            type="email"
            fullWidth
            value={newCustomer.email}
            onChange={handleTextFieldChange}
          />
          <TextField
            
            margin="dense"
            id="phone"
            label="Phone number"
            type="text"
            fullWidth
            value={newCustomer.phone}
            onChange={handleTextFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            addCustomer();
            handleClose();
          }} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

  );
}