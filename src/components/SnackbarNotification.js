import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar  } from "@material-ui/core";
import {closeSnackbar} from "../redux/actions/snackBarActions"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SnackbarNotification = () => {
    const dispatch = useDispatch();
    const snackBarState = useSelector(state => state.snackBarReducer); 
    const handleClose =  () => dispatch(closeSnackbar());
   
  return (
    <Snackbar open={snackBarState.snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={snackBarState.severity}>
    {snackBarState.message}
    </Alert>
  </Snackbar>
  );
};
export default SnackbarNotification;