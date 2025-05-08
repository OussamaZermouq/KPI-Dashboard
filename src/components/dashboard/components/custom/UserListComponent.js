import * as React from "react";
import {
  getAllUsers,
  updateUserStatus,
} from "../../../../service/UsersService";
import {
  DataGrid,
  renderEditInputCell,
  useGridApiContext,
} from "@mui/x-data-grid";
import {
  Box,
  dividerClasses,
  FormControlLabel,
  Select,
  Switch,
  useRadioGroup,
} from "@mui/material";

export default function UserListComponent({ setSnackBarProps }) {
  const [userList, setUserList] = React.useState([]);
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(true);
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

  function SelectEditInputCell(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleChange = async (event) => {
      await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });
      apiRef.current.stopCellEditMode({ id, field });
    };

    return (
      <Select
        value={value}
        onChange={handleChange}
        size="small"
        sx={{ height: 1 }}
        native
        autoFocus
      >
        <option>Admin</option>
        <option>User</option>
      </Select>
    );
  }

  const renderSelectEditInputCell = (params) => {
    return <SelectEditInputCell {...params} />;
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
      renderEditCell: renderSelectEditInputCell,
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
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <DataGrid
      sx={{
        width: "80%",
        m: 5,
      }}
      loading={loading}
      getRowId={(row) => row.email}
      rows={userList}
      columns={columns}
      rowSelection={false}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
    />
  );
}
