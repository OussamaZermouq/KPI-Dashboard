import {
  Button,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Stack,
  Switch,
} from "@mui/material";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import * as React from "react";
import {
  getAllUsers,
  updateUserInformation,
  updateUserStatus,
} from "../../../../service/UsersService";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserUpdateDialog from "./UserUpdateDialog";
import UserCreationDialog from "./UserCreationDialog";
import UserDeletionDialog from "./UserDeletionDialog";

export default function UserListComponent({ setSnackBarProps }) {
  const [userList, setUserList] = React.useState([]);
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  //dialog props
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogDataProp, setDialogDataProp] = React.useState();

  //deletion dialog
  const [deletionDialogOpen, setDeletionDialogOpen] = React.useState(false);
  const [deletionDialogUserId, setDeletionDialogUserId] = React.useState();

  const menuOpen = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const getUserData = async () => {
    await getAllUsers().then((output) => {
      if (output) {
        setUserList(output);
        setLoading(false);
      } else {
        setError("ERROR");
      }
    });
  };
  React.useEffect(() => {
    getUserData();
  }, []);

  const onUpdateUserStatus = async (email) => {
    setLoading(true);
    await updateUserStatus(email).then((response) => {
      if (response === 200) {
        setSnackBarProps({
          open: true,
          severity: "success",
          message: "User has been updated",
        });
      } else {
        setSnackBarProps({
          open: true,
          severity: "error",
          message: "An error has occurred",
        });
      }
    });
    setLoading(false);
  };

  const columns = [
    { field: "firstName", headerName: "First name", flex: 1, minWidth: 150 },
    { field: "lastName", headerName: "Last name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
      minWidth: 150,
      valueGetter: (value) => {
        return new Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date(value));
      },
    },
    {
      field: "role",
      headerName: "User Role",
      flex: 0.5,
      minWidth: 50,
    },
    {
      field: "enabled",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const onSwitchChange = (e) => {
          const newEnabled = e.target.checked;
          setUserList((prev) =>
            prev.map((user) =>
              user.email === params.row.email
                ? { ...user, enabled: newEnabled }
                : user
            )
          );
          onUpdateUserStatus(params.row.email);
        };
        return (
          <FormControlLabel
            control={
              <Switch checked={params.row.enabled} onChange={onSwitchChange} />
            }
            label={params.row.enabled ? "Enabled" : "Disabled"}
          />
        );
      },
    },

    {
      headerName: "Actions",
      flex: 1,
      minWidth: 50,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={
                menuOpen && selectedRow?.email === params.row.email
                  ? "long-menu"
                  : undefined
              }
              aria-expanded={
                menuOpen && selectedRow?.email === params.row.email
                  ? "true"
                  : undefined
              }
              aria-haspopup="true"
              onClick={(event) => handleClick(event, params.row)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={menuOpen && selectedRow?.email === params.row.email}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                sx={{
                  display: "flex",
                  gap: "5",
                }}
                key={1}
                onClick={() => {
                  setDialogOpen(true);
                  setDialogDataProp(params.row);
                }}
                onClose={handleClose}
              >
                <EditIcon />
                Update
              </MenuItem>

              <MenuItem
                color="danger"
                key={2}
                onClick={() => {
                  setDeletionDialogOpen(true);
                  setDeletionDialogUserId(params.row.userId);
                }}
              >
                <DeleteIcon />
                Delete
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogDataProp(null);
  };

  const handleDeletionDialogClose = () => {
    setDeletionDialogOpen(false);
    setDeletionDialogUserId(null);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: "90%",
        p: 5,
      }}
    >
      <UserCreationDialog
        setSnackBarProps={setSnackBarProps}
        onUserCreated={getUserData}
      />

      <DataGrid
        sx={{
          width: "100%",
          alignSelf: "center",
        }}
        loading={loading}
        getRowId={(row) => row.email}
        rows={userList}
        columns={columns}
        rowSelection={false}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
      <UserUpdateDialog
        dialogOpenProp={dialogOpen}
        userUpdateDialogDataProp={dialogDataProp}
        setSnackBarProps={setSnackBarProps}
        onDialogClose={handleDialogClose}
        onUserUpdate = {getUserData}
      />

      <UserDeletionDialog
        dialogOpenProp={deletionDialogOpen}
        userIdProp={deletionDialogUserId}
        setSnackBarProps={setSnackBarProps}
        onDialogClose={handleDeletionDialogClose}
        onUserDeleted = {getUserData}
      />
    </Stack>
  );
}
