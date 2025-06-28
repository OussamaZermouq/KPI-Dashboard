import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { getAllFiles } from "../../../service/FileService";

export default function ArchiveFileTable() {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getFilesData = async () => {
    await getAllFiles().then((output) => {
      if (output) {
        setFileList(output);
        setLoading(false);
      } else {
        setError("ERROR");
      }
    });
  };

  React.useEffect(() => {
    getFilesData();
  }, []);
  const paginationModel = { page: 0, pageSize: 20 };

  const columns = [
    { field: "fileId", headerName: "ID file", flex: 1, minWidth: 150 },
    { field: "fileName", headerName: "File name", flex: 1, minWidth: 150 },
    { field: "fileUrl", headerName: "File URL", flex: 1, minWidth: 150 },
    { field: "startDate", headerName: "Start date", flex: 1, minWidth: 150 },
    { field: "endDate", headerName: "End date", flex: 1, minWidth: 150 },
    {
      field: "uploadedAt",
      headerName: "Uploaded at",
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
  return (
    <DataGrid
      sx={{
        width: "100%",
        alignSelf: "center",
      }}
      loading={loading}
      getRowId={(row) => row.fileId}
      rows={fileList}
      columns={columns}
      rowSelection={false}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[10, 20]}
    />
  );
}
