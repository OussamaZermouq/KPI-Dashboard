import * as React from "react";
import { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./components/AppNavbar";
import Header from "./components/Header";
import MainGrid from "./components/MainGrid";
import SideMenu from "./components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";
import { getKPI, getSheetNames } from "../../service/kpiService";
import { Paper, Typography, Button, useMediaQuery } from "@mui/material";

import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./theme/customizations";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CustomDialogSheetName from "./components/custom/CustomDialogSheetName";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};
export default function Dashboard({ onLogout, ...props }) {
  const [value, setValue] = React.useState("1");
  const [file, setFile] = useState();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [sheetsNames, setSheetNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rpcConnectionRateArray, setRpcConnectionRateArray] = useState([]);
  const [userThroughputDL, setUserThroughputDL] = useState([]);
  const [userThroughputUL, setUserThroughputUL] = useState([]);
  const [erabSuccessRate, setErabSuccessRate] = useState([]);
  const [trafficVolumeUL, setTrafficVolumeUL] = useState([]);
  const [trafficVolumeDL, setTrafficVolumeDL] = useState([]);
  const [hours, setHours] = useState([]);
  const [cellAvailability, setCellAvailability] = useState([]);
  const [sessionContinuityData, setSeesionContinuityData] = useState([]);
  const [selectedSheetName, setSelectedSheetName] = useState(null);
  const [showSheetDialog, setShowSheetDialog] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //1 after upload 
  const handleUploadFile = async (file) => {
    setFile(file);
    const sheetsNamesData = await getSheetNames(file);
    if (sheetsNamesData || sheetsNamesData["data"]) {
      setSheetNames(sheetsNamesData);
    }

    setFileUploaded(true);
  };
  //2 after sheetname selection

  const handleSheetNameSelected = async (sheetName) => {
    console.log(selectedSheetName);
    console.log(fileUploaded);
    setLoading(true);
    setUploadedFile(file);
    try {
      const kpiData = await getKPI(sheetName, file);
      if (!kpiData || !kpiData["data"]) {
        console.error("Invalid KPI data received:", kpiData);
        return;
      }
      let hourData = Object.values(kpiData["data"]).map((kpi) => kpi["Hour"]);
      let rrcConnectionRate = Object.values(kpiData["data"]).map(
        (kpi) => kpi["1_RRC Connection Success Rate"]
      );

      let userDownloadRate = Object.values(kpiData["data"]).map(
        (kpi) => kpi["6_User throughput DL"]
      );
      let userUploadRate = Object.values(kpiData["data"]).map(
      let userUploadRate = Object.values(kpiData["data"]).map(
        (kpi) => kpi["7_User throughtput UL"]
      );
      let erabSuccessRate = Object.values(kpiData["data"]).map(
      );
      let erabSuccessRate = Object.values(kpiData["data"]).map(
        (kpi) => kpi["2_ERAB Setup Success Rate"]
      );
      let trafficVolumeUL = Object.values(kpiData["data"]).map(
      );
      let trafficVolumeUL = Object.values(kpiData["data"]).map(
        (kpi) => kpi["Traffic Volume UL (Gbytes)"]
      );
      let trafficVolumeDL = Object.values(kpiData["data"]).map(
      );
      let trafficVolumeDL = Object.values(kpiData["data"]).map(
        (kpi) => kpi["Traffic Volume DL (Gbytes)"]
      );
      );
      let cellAvailability = Object.values(kpiData["data"]).map(
        (kpi) => kpi["10_Cell Availability"]
      );
      let sessionContinuity = Object.values(kpiData["data"]).map(
        (kpi) => kpi["9_LTE Session Continuity"]
      );
      setRpcConnectionRateArray(rrcConnectionRate);
      setUserThroughputDL(userDownloadRate);
      setUserThroughputUL(userUploadRate);
      setErabSuccessRate(erabSuccessRate);
      setTrafficVolumeUL(trafficVolumeUL);
      setTrafficVolumeDL(trafficVolumeDL);
      setHours(hourData);
      setCellAvailability(cellAvailability);
      setSeesionContinuityData(sessionContinuity);
    } catch (error) {
      console.error("Error fetching KPI data:", error);
    } finally {
      setLoading(false);
    }
  };

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
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu onLogout={onLogout} />
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

            {fileUploaded && showSheetDialog && (
              <CustomDialogSheetName
                dialogDataProp={sheetsNames}
                selectedSheetName={setSelectedSheetName}
                handleSelectSheetnameChange={handleSheetNameSelected}
                onDialogClose={() => setShowSheetDialog(false)}
              />
            )}
            {fileUploaded && selectedSheetName && !showSheetDialog && !loading && (
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="4G" value="1" />
                    <Tab label="3G" value="2" />
                    <Tab label="2G" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <MainGrid
                    rrcConnectionRateProp={rpcConnectionRateArray}
                    userDownloadRate={userThroughputDL}
                    userUploadRate={userThroughputUL}
                    erabSuccessRateProp={erabSuccessRate}
                    uploadtTrafficProp={trafficVolumeUL}
                    downloadTrafficProp={trafficVolumeDL}
                    hourProp={hours}
                    cellAvailabilityProp={cellAvailability}
                    sessionContinuityProp={sessionContinuityData}
                    hoursDataProp={hours}
                  />
                </TabPanel>
                <TabPanel value="2">
                  <Typography>No Data found</Typography>
                </TabPanel>
                <TabPanel value="3">
                  <Typography>No Data found</Typography>
                </TabPanel>
              </TabContext>
            )}

            {!fileUploaded && (
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload a file to analyze
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) =>
                      handleUploadFile(event.target.files[0])
                    }
                  />
                </Button>
              </Paper>
            )}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}