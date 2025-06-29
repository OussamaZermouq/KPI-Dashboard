import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteFileFromCloud } from "../../../service/FileService";

export default function FileDeletionConfirmationDialog({ fileId, onFileDelete, handleMenuItemClose }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const hanleDialogConfirmation = async () => {
    try {
      const response = await deleteFileFromCloud(fileId);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
    handleClose();
    onFileDelete();
    handleMenuItemClose();
  };

  return (
    <React.Fragment>
      <MenuItem
        sx={{
          display: "flex",
          gap: "5px",
          color: "red",
        }}
        key={`${fileId}-menuitem-delete`}
        onClick={handleClickOpen}
      >
        <DeleteIcon />
        Delete
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm file deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this file from the database
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={hanleDialogConfirmation} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
