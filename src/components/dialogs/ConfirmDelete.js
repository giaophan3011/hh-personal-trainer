import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../redux/actions/dialogActions";

const ConfirmDelete = () => {
  const dispatch = useDispatch();
  const dialogState = useSelector((state) => state.dialogReducer);
  const objectToDelete = dialogState.dialogData.dialogObject;
  const dialogTitle = dialogState.dialogData.dialogTitle;

  const handleClose = () => {
    dispatch(closeDialog());
  };

  const handleDelete = () => {
    dialogState.dialogData.callbackFunction(objectToDelete);
  };

  console.log(dialogState);

  return (
    <Dialog open={dialogState.dialogOpen} onClose={handleClose} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">{dialogTitle}</DialogTitle>
      <DialogContent>
        Do you want to delete{" "}
        {dialogTitle.includes("customer")
          ? ` customer ${objectToDelete.firstname} ${objectToDelete.lastname}`
          : `activity ${objectToDelete.activity}`}
        ? Deletion cannot be undone
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="secondary">
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
            handleDelete();
          }}
          color="default"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDelete;
