import * as React from "react";
import { getAllUsers } from "../../../../service/UsersService";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useScatterChartProps } from "@mui/x-charts/internals";

export default function UserListComponent() {
  const [userList, setUserList] = React.useState([]);
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const getUserData = async () => {
    await getAllUsers().then((output) => {
      console.log(output);
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

  const columns = [
    { field: "firstName", headerName: "First name", flex: 1, minWidth: 150 },
    { field: "lastName", headerName: "Last name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "Date",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "isEnabled",
      headerName: "Status",
      type: "bool",
      flex: 1,
      minWidth: 150,
      
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box
      sx={{
        width: "80%",
      }}
    >
      <DataGrid
        loading={loading}
        getRowId={(row) => row.email}
        rows={userList}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Box>
  );
}
