import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeDialog } from '../../redux/actions/dialogActions';
import AddCustomerDialog from './AddCustomer';
import AddTrainingDialog from './AddTraining';


const DialogManager = () => {
    const dispatch = useDispatch();
    const dialogState = useSelector(state => state.dialogReducer); 
    const handleClose =  () => dispatch(closeDialog());
   
  return (
    <div>
        {
            dialogState.dialogType === "DIALOG_ADD_CUSTOMER" ? <AddCustomerDialog/> : <AddTrainingDialog/>
        }
    </div>
  );
};
export default  DialogManager;