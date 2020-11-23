import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const ConfirmDialog = (props) => {
  const { handleDelete, title, deletedObject } = props;
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const handleClickOpen = () => {
    setOpenConfirmDialog(true);
  };

  const handleClose = () => {
    setOpenConfirmDialog(false);
    
  };
  return (
    <div>
    <DeleteForeverIcon color="secondary" onClick={() => setOpenConfirmDialog(true)}/>
    <Dialog
      open={openConfirmDialog}
      onClose={handleClickOpen}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
    <DialogContent>Do you want to delete {deletedObject}? Deletion cannot be undone</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleClose}
          color="secondary"
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleClose()
            handleDelete();
          }}
          color="default"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};
export default ConfirmDialog;