import * as React from "react";
import { Box, Paper, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import SideMenu from "../dashboard/components/SideMenu";
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import CreateCustomChartStepper from "../dashboard/components/custom/CreateCustomChartStepper";

export default function CustomChatCreationPage() {
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
          {/* Content */}
          <Box sx={{
            width:'90%',
          }}>
            <CreateCustomChartStepper />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
