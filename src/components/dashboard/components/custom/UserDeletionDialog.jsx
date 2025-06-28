import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { deleteUser } from "../../../../service/UsersService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserDeletionDialog({
  dialogOpenProp,
  userIdProp,
  setSnackBarProps,
  onDialogClose,
  onUserDeleted,
}) {
  const [userId, setUserId] = React.useState(userIdProp);
  const [dialogOpen, setDialogOpen] = React.useState(dialogOpenProp);
  const [dialogError, setDialogError] = React.useState("");
  const [deletionLoading, setDeletionLoading] = React.useState(false);

  React.useEffect(() => {
    setDialogOpen(dialogOpenProp);
  }, [dialogOpenProp]);

  React.useEffect(() => {
    setUserId(userIdProp);
  }, [userIdProp]);

  const handleClose = () => {
    setDialogOpen(false);
    onDialogClose();
  };

  const handleUserDeletionConfirmationClick = async () => {
    try {
      const response = await deleteUser(userId);
      if (response.status === 200) {
        setSnackBarProps({
          open: true,
          severity: "success",
          message: "User has been deleted",
        });
        setUserId(null);
      } else {
        setSnackBarProps({
          open: true,
          severity: "error",
          message: "An error has occurred",
        });
      }
      if (onUserDeleted) onUserDeleted();
      setDialogOpen(false);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={dialogOpen}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"User Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you really want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="error"
            variant="outlined"
            onClick={handleUserDeletionConfirmationClick}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
