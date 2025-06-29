import { DataGrid, unstable_resetCleanupTracking } from "@mui/x-data-grid";
import React, { useState } from "react";
import { getAllFiles, uploadFileToCloud } from "../../../service/FileService";
import {
  Box,
  Avatar,
  Button,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Menu,
  MenuItem,
  styled,
  Tooltip,
} from "@mui/material";
import FileActionsDialog from "./FileActionsDialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { decodedJwtToken } from "../../../service/Login";
import FileDeletionConfirmationDialog from "./FileDeletionConfimrationDialog";
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ArchiveFileTable({ setSnackBarProps }) {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [dialogOpen, setDialogOpen] = useState();
  const [fileActionsDialogOpen, setFileActionsDialogOpen] = useState(false);
  const [uploadError, setUploadError] = useState();
  const [selectedUploadFile, setSelectedUploadFile] = useState();

  const getFilesData = async () => {
    setLoading(true);
    await getAllFiles().then((output) => {
      if (output) {
        setFileList(output["data"]);
        setLoading(false);
      } else {
        setError("ERROR");
      }
    });
  };

  const handleFileSelection = async (e) => {
    setLoading(true);
    await uploadFileToCloud(e.target.files[0])
      .then((output) => {
        console.log(output.code);

        if (output.code === 200) {
          setSnackBarProps({
            open: true,
            severity: "success",
            message: "File has been successfully uploaded",
          });
        } else if (output.code === 400) {
          setSnackBarProps({
            open: true,
            severity: "error",
            message: "File is already in the database",
          });
        } else {
          setSnackBarProps({
            open: true,
            severity: "error",
            message: "Internal server error has occurred",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setSnackBarProps({
          open: true,
          severity: "error",
          message: "An error has occurred",
        });
      });
    //this function sets the loading to false
    getFilesData();
  };

  React.useEffect(() => {
    getFilesData();
  }, []);

  const paginationModel = { page: 0, pageSize: 20 };
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event, row) => {
    setSelectedRow(row);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .no-rows-primary": {
      fill: "#3D4751",
      ...theme.applyStyles("light", {
        fill: "#AEB8C2",
      }),
    },
    "& .no-rows-secondary": {
      fill: "#1D2126",
      ...theme.applyStyles("light", {
        fill: "#E8EAED",
      }),
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width={96}
          viewBox="0 0 452 257"
          aria-hidden
          focusable="false"
        >
          <path
            className="no-rows-primary"
            d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
          />
          <path
            className="no-rows-primary"
            d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
          />
          <path
            className="no-rows-primary"
            d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
          />
          <path
            className="no-rows-secondary"
            d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
          />
        </svg>
        <Box sx={{ mt: 2 }}>No rows</Box>
      </StyledGridOverlay>
    );
  }

  const columns = [
    { field: "fileId", headerName: "File ID", flex: 0.4, minWidth: 50 },
    { field: "fileName", headerName: "File name", flex: 1, minWidth: 150 },
    {
      field: "startDate",
      headerName: "Start date",
      flex: 0.7,
      minWidth: 150,
      valueGetter: (value) => {
        return new Intl.DateTimeFormat("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour12: false,
        }).format(new Date(value));
      },
    },
    {
      field: "endDate",
      headerName: "End date",
      flex: 0.7,
      minWidth: 150,
      valueGetter: (value) => {
        return new Intl.DateTimeFormat("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour12: false,
        }).format(new Date(value));
      },
    },
    {
      field: "uploadedBy",
      headerName: "Uploaded By",
      flex: 1,
      minWidth: 150,
      align: "center",
      valueGetter: (value) => value ? `${value.firstName} ${value.lastName}`: "",
      renderCell: (params) => {
        const firstLastName =
          params.row.uploadedBy.firstName +
          " " +
          params.row.uploadedBy.lastName;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Tooltip title={firstLastName}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                }}
                {...stringAvatar(firstLastName.toUpperCase())}
              />
            </Tooltip>
          </Box>
        );
      },
    },

    {
      field: "uploadedAt",
      headerName: "Uploaded at",
      flex: 1,
      minWidth: 150,
      valueGetter: (value) => {
        return new Intl.DateTimeFormat("fr-FR", {
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
      headerName: "Actions",
      flex: 1,
      minWidth: 50,
      renderCell: (params) => {
        const decodedToken = decodedJwtToken();
        const canUserEditDelete =
          decodedToken.role === "ADMIN" ||
          decodedToken.sub === params.row.uploadedBy.email;
        return (
          <>
            <IconButton
              key={`${params.row.fileId}-button`}
              aria-label="more"
              id="long-button"
              aria-controls={
                menuOpen && selectedRow?.fileId === params.row.fileId
                  ? "long-menu"
                  : undefined
              }
              aria-expanded={
                menuOpen && selectedRow?.fileId === params.row.fileId
                  ? "true"
                  : undefined
              }
              aria-haspopup="true"
              onClick={(event) => handleClick(event, params.row)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              key={`${params.row.fileId}-menu`}
              id="basic-menu"
              anchorEl={anchorEl}
              open={menuOpen && selectedRow?.fileId === params.row.fileId}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                sx={{
                  display: "flex",
                  gap: "5px",
                }}
                key={`${params.row.fileId}-menuitem-download`}
                onClick={() => {
                  setDialogOpen(true);
                  window.open(params.row.fileUrl, "_blank", "noreferrer");
                }}
                onClose={handleClose}
              >
                <DownloadIcon />
                Download
              </MenuItem>
              {canUserEditDelete && (
                <MenuItem
                  divider
                  sx={{ display: "flex", gap: "5px" }}
                  key={`${params.row.fileId}-menuitem-edit`}
                  onClose={handleClose}
                >
                  <EditIcon />
                  Change file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                      handleFileSelection(event);
                    }}
                  />
                </MenuItem>
              )}
              {canUserEditDelete && (
                <FileDeletionConfirmationDialog
                  fileId={params.row.fileId}
                  onFileDelete={getFilesData}
                  handleMenuItemClose={handleClose}
                />
              )}
            </Menu>
          </>
        );
      },
    },
  ];
  return (
    <Stack
      spacing={2}
      sx={{
        width: "90%",
        p: 5,
        height: 400,
      }}
    >
      <Button
        sx={{
          alignSelf: "end",
        }}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload a file
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => {
            handleFileSelection(event);
          }}
        />
      </Button>
      <DataGrid
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
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
    </Stack>
  );
}
