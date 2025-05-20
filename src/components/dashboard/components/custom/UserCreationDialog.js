import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import createUser from "../../../../service/UsersService";

export default function UserCreationDialog({ setSnackBarProps, onUserCreated }) {
  const [userCreationDialogOpen, setUserCreationDialogOpen] =
    React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [dialogError, setDialogError] = React.useState("");
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    userRole: "",
  });
  const handleClose = () => {
    setUserCreationDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setUserCreationDialogOpen(true);
  };
  const handleCreationDialogConfirmationClick = async () => {
    setDialogError("");

    if (userData.password !== userData.passwordConfirmation) {
      setDialogError("Passwords don't match");
      return;
    }

    try {
      setLoading(true);
      const response = await createUser(userData);
      
      setSnackBarProps({
        open: true,
        severity: "success",
        message: "User has been successfully created",
      });

      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        userRole: "",
      });
      if (onUserCreated) onUserCreated();
      handleClose(true);
    } catch (error) {
      console.log(error)
      if (error.status === 409) {
        setDialogError("Email already exists");
      } else {
        setSnackBarProps({
          open: true,
          severity: "error",
          message: `Error: ${error.message || "An unexpected error occurred"}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        sx={{
          alignSelf: "flex-end",
        }}
        onClick={() => {
          handleDialogOpen(true);
        }}
      >
        Create user
      </Button>
      <Dialog
        open={userCreationDialogOpen}
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
          <PersonOutlineIcon fontSize="medium" /> {"Create a new user"}
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
                value={userData.firstName}
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                fullWidth
                id="confirmPassword"
                type="password"
                label="Retype Password"
                variant="standard"
                onChange={(event) =>
                  setUserData({
                    ...userData,
                    passwordConfirmation: event.target.value,
                  })
                }
              />
            </Box>
            <Box
              sx={{
                gridColumn: "span 2",
              }}
            >
              <FormControl fullWidth disabled={loading}>
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
                color: "red",
              }}
            >
              {dialogError}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={handleCreationDialogConfirmationClick}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
