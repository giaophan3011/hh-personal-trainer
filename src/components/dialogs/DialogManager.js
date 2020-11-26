import React from "react";
import { useSelector } from "react-redux";
import AddCustomerDialog from "./AddCustomer";
import AddTrainingDialog from "./AddTraining";
import ConfirmDelete from "./ConfirmDelete";

const DialogManager = () => {
  const dialogState = useSelector((state) => state.dialogReducer);

  return (
    <div>
      {dialogState.dialogType === "DIALOG_ADD_CUSTOMER" ? (
        <AddCustomerDialog />
      ) : dialogState.dialogType === "DIALOG_ADD_TRAINING" ? (
        <AddTrainingDialog />
      ) : (
        <ConfirmDelete />
      )}
    </div>
  );
};
export default DialogManager;
