import React, { useEffect, useState } from "react";
import { updateUserInformation } from "../../../../service/UsersService";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
export default function UserUpdateDialog({
  dialogOpenProp,
  userUpdateDialogDataProp,
  setSnackBarProps,
  onDialogClose,
  onUserUpdate
}) {
  const [dialogData, setDialogData] = useState(userUpdateDialogDataProp);
  const [dialogOpen, setDialogOpen] = useState(dialogOpenProp);
  const [dialogError, setDialogError] = React.useState("");
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({
    userId: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmationPassword: "",
    userRole: "",
  });

  useEffect(() => {
    setDialogOpen(dialogOpenProp);
  }, [dialogOpenProp]);

  useEffect(() => {
    setDialogData(userUpdateDialogDataProp);
    if (userUpdateDialogDataProp) {
      setUserData({
        userId: userUpdateDialogDataProp.userId,
        firstName: userUpdateDialogDataProp.firstName,
        lastName: userUpdateDialogDataProp.lastName,
        email: userUpdateDialogDataProp.email,
        password: "",
        confirmationPassword: "",
        userRole: userUpdateDialogDataProp.role,
      });
    }
  }, [userUpdateDialogDataProp]);

  const handleClose = () => {
    setDialogOpen(false);
    onDialogClose();
  };

  const handleUpdateDialogConfirmationClick = () => {
    if (userData.confirmationPassword !== userData.password) {
      setDialogError("Passwords don't match");
      return;
    }
    updateUserInformation(userData).then((responseStatus) => {
      setUpdateLoading(true);

      if (responseStatus === 200) {
        setSnackBarProps({
          open: true,
          severity: "success",
          message: "User has been updated",
        });
        setDialogData({
          dialogData: {
            userId: null,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmationPassword: "",
            userRole: "",
          },
          dialogOpen: false,
        });
      } else {
        setSnackBarProps({
          open: true,
          severity: "error",
          message: "An error has occurred",
        });
      }
      if (onUserUpdate) onUserUpdate()
      setDialogOpen(false)
      setUpdateLoading(false);
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <PersonOutlineIcon fontSize="medium" /> {"Update user data"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            <Box>
              <TextField
                value={userData.firstName ? userData.firstName : ""}
                disabled={updateLoading}
                required
                id="firstName"
                label="First Name"
                variant="standard"
                onChange={(event) =>
                  setUserData({
                    ...userData,
                    firstName: event.target.value,
                  })
                }
              />
            </Box>
            <Box>
              <TextField
                value={userData.lastName ? userData.lastName : ""}
                required
                disabled={updateLoading}
                id="lasttName"
                label="Last Name"
                variant="standard"
                onChange={(event) =>
                  setUserData({
                    ...userData,
                    lastName: event.target.value,
                  })
                }
              />
            </Box>
            <Box
              sx={{
                gridColumn: "span 2",
              }}
            >
              <TextField
                value={userData.email ? userData.email : ""}
                fullWidth
                disabled={updateLoading}
                required
                id="email"
                type="email"
                label="Email"
                variant="standard"
                onChange={(event) =>
                  setUserData({
                    ...userData,
                    email: event.target.value,
                  })
                }
              />
            </Box>
            <Box
              sx={{
                gridColumn: "span 2",
              }}
            >
              <TextField
                disabled={updateLoading}
                fullWidth
                id="password"
                type="password"
                label="Password"
                variant="standard"
                onChange={(event) =>
                  setUserData({
                    ...userData,
                    password: event.target.value,
                  })
                }
              />
            </Box>
            <Box
              sx={{
                gridColumn: "span 2",
              }}
            >
              <TextField
                disabled={updateLoading}
                fullWidth
                id="confirmPassword"
                type="password"
                label="Retype Password"
                variant="standard"
                onChange={(event) =>
                  setUserData({
                    ...userData,
                    confirmationPassword: event.target.value,
                  })
                }
              />
            </Box>
            <Box
              sx={{
                gridColumn: "span 2",
              }}
            >
              <FormControl fullWidth disabled={updateLoading}>
                <InputLabel id="user-role-select">User role</InputLabel>
                <Select
                  fullWidth
                  labelId="user-role-select"
                  id="user-role-select"
                  value={userData.userRole}
                  input={<OutlinedInput label="User role" />}
                  onChange={(event) =>
                    setUserData({
                      ...userData,
                      userRole: event.target.value,
                    })
                  }
                >
                  <MenuItem value={"ADMIN"}>Admin</MenuItem>
                  <MenuItem value={"USER"}>User</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                gridColumn: "span 2",
              }}
            >
              {dialogError}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button disabled={updateLoading} onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button
            disabled={updateLoading}
            onClick={handleUpdateDialogConfirmationClick}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
