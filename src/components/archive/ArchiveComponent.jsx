import React from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import SideMenu from "../dashboard/components/SideMenu";
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import { alpha } from "@mui/material/styles";
import UserListComponent from "../dashboard/components/custom/UserListComponent";
import { Alert, Snackbar } from "@mui/material";
import ArchiveFileTable from "./components/ArchiveFileTable";

export default function ArchivePage() {
  const [snackBarProps, setSnackBarProps] = React.useState({
    open: false,
    severity: "",
    message: "",
  });

  const handleClose = () => {
    setSnackBarProps({
      ...snackBarProps,
      open: false,
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu />
      <AppNavbar />
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: "auto",
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Header />
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={snackBarProps.open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snackBarProps.severity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackBarProps.message}
            </Alert>
          </Snackbar>
          <ArchiveFileTable setSnackBarProps={setSnackBarProps}/>
        </Stack>
      </Box>
    </Box>
  );
}
