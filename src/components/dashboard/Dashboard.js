import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./components/AppNavbar";
import Header from "./components/Header";
import MainGrid from "./components/MainGrid";
import SideMenu from "./components/SideMenu";
import { getKPI, getFileInfo } from "../../service/kpiService";
import {
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Typography,
  Button,
  Skeleton,
  Grid2,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import SheetCityDateSelectionDialog from "./components/custom/SheetCityDateSelectionDialog";
import TabPanel from "@mui/lab/TabPanel";
import useCity from "../../hooks/useCity";
import useSheet from "../../hooks/useSheet";
import { LineChart } from "recharts";
import { BarChart } from "@mui/x-charts";
import useDate from "../../hooks/useDate";

export default function Dashboard({ onLogout, ...props }) {
  const [value, setValue] = React.useState("1");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [sheetsNames, setSheetNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState([]);
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
  const [file, setFile] = useState();
  const [city, setCity] = useState();
  const [_9_LTE_Session_Continuity, set_9_LTE_Session_Continuity] = useState(
    []
  );
  const [_16QAM_, set_16QAM_] = useState([]);
  const [_64QAM_, set_64QAM_] = useState([]);
  const [_256QAM_, set_256QAM_] = useState([]);
  const [CQI, setCQI] = useState([]);
  const [IntraFrequencyHOSR, setIntraFrequencyHOSR] = useState([]);
  const [Active_users, setActive_users] = useState([]);
  const [S1_Signaling_Setup, setS1_Signaling_Setup] = useState([]);
  const [_3_E_RAB_Drop_Rate_, set_3_E_RAB_Drop_Rate_] = useState([]);
  const [RRC_Connect_User, setRRC_Connect_User] = useState([]);
  const [_6_User_throughput_DL, set_6_User_throughput_DL] = useState([]);
  const [_7_User_throughtput_UL, set_7_User_throughtput_UL] = useState([]);
  const [Inter_Frequency_HOSR, set_Inter_Frequency_HOSR] = useState([]);
  const [pmCellDowntimeAuto, setPmCellDowntimeAuto] = useState([]);
  const [pmCellDowntimeMan, setPmCellDowntimeMan] = useState([]);
  const [Traffic_Volume_UL__Gbytes, setTraffic_Volume_UL__Gbytes] = useState(
    []
  );
  const [Traffic_Volume_DL__Gbytes, setTraffic_Volume_DL__Gbytes] = useState(
    []
  );
  const [pmActiveUeDlSum, setPmActiveUeDlSum] = useState([]);
  const [_CSFBtoUMTS, set_CSFBtoUMTS] = useState([]);
  const [_CSFB_to_GSM, set_CSFB_to_GSM] = useState([]);
  const [User_throughput_DL_CA_, setUser_throughput_DL_CA] = useState([]);
  const [CellThroughputDLMbps__, setCellThroughputDLMbps__] = useState([]);
  const [RSSI_dbm__, setRSSI_dbm_] = useState([]);
  const [RSSI_PUCCH_dBm_, setRSSI_PUCCH_dBm_] = useState([]);
  const [CSFB_SR__, setCSFB_SR__] = useState([]);
  const [PRB_DL_New, setPRB_DL_New] = useState([]);
  const [PRB_UL_New, setPrbULNew] = useState([]);
  const [SINR_Pusch_dB, setSINR_Pusch_dB] = useState([]);
  const [QPSK___, setQPSK__] = useState([]);
  const [SpectralEfficiencybpshz___, setSpectralEfficiencybpshz] = useState([]);
  const [Average_DL_UE_Latency, setAverage_DL_UE_Latency] = useState([]);
  const [Cell_Throughput_UL_Mbps_, setCell_Throughput_UL_Mbps_] = useState([]);
  const [UL_RLC_Bler_Rate__, setUL_RLC_Bler_Rate__] = useState([]);
  const [DL_RLC_Bler_Rate_, setDL_RLC_Bler_Rate_] = useState([]);
  const [User_throughput_UL_CA_, setUser_throughput_UL_CA] = useState([]);

  const [userSelectedCity, setUserSelectedCity] = useState();
  const [citiesState, setCitiesState] = useState([]);
  const [showUploadInput, setShowUploadInput] = useState(false);
  const { selectedCity } = useCity();
  const { selectedSheet } = useSheet();
  const { selectedDate } = useDate();
  useEffect(() => {
    const reloadDashboard = async () => {
      await handleSheetNameSelected(selectedSheet, selectedCity, selectedDate, file);
    };
    if (file) reloadDashboard();
  }, [selectedCity, selectedSheet, selectedDate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //1 handle upload
  const handleUploadFile = async (file) => {
    setFile(file);
    const data = await getFileInfo(file);
    if (data && data["sheets"] && data["cities"]) {
      setSheetNames(data["sheets"]);
      setCitiesState(data["cities"]);
      setDates(data["dates"]);
      setFileUploaded(true);
    } else {
      console.log("Invalid data received:", data);
    }
  };

  //2 handle sheetname selection

  const handleSheetNameSelected = async (
    selectedSheet,
    selectedCity,
    selectedDate
  ) => {
    setLoading(true);
    try {
      const kpiData = await getKPI(
        selectedSheet,
        selectedCity,
        selectedDate,
        file
      );

      if (!kpiData || !kpiData["data"]) {
        console.error("Invalid KPI data received:", kpiData);
        return;
      }

      let hourData = Object.values(kpiData["data"]).map((kpi) => {
        return kpi["Hour"];
      });
      let datesData = Object.values(kpiData["data"]).map((kpi) => {
        return kpi["Date"];
      });
      let rrcConnectionRate = Object.values(kpiData["data"]).map(
        (kpi) => kpi["1_RRC Connection Success Rate"]
      );
      let userDownloadRate = Object.values(kpiData["data"]).map(
        (kpi) => kpi["6_User throughput DL"]
      );
      let userUploadRate = Object.values(kpiData["data"]).map(
        (kpi) => kpi["7_User throughtput UL"]
      );
      let erabSuccessRate = Object.values(kpiData["data"]).map(
        (kpi) => kpi["2_ERAB Setup Success Rate"]
      );
      let trafficVolumeUL = Object.values(kpiData["data"]).map(
        (kpi) => kpi["Traffic Volume UL (Gbytes)"]
      );
      let trafficVolumeDL = Object.values(kpiData["data"]).map(
        (kpi) => kpi["Traffic Volume DL (Gbytes)"]
      );
      let cellAvailability = Object.values(kpiData["data"]).map(
        (kpi) => kpi["10_Cell Availability"]
      );
      let _16QAM__ = Object.values(kpiData["data"]).map((kpi) => kpi["16QAM%"]);
      let _64QAM_ = Object.values(kpiData["data"]).map((kpi) => kpi["64QAM%"]);
      let _256QAM_ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["256QAM%"]
      );
      let cityData = Object.values(kpiData["data"]).map((kpi) => kpi["City"]);
      let _9_LTE_Session_Continuity_ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["9_LTE Session Continuity"]
      );
      let Active_users = Object.values(kpiData["data"]).map(
        (kpi) => kpi["Active_users"]
      );
      let IntraFrequencyHOSR = Object.values(kpiData["data"]).map(
        (kpi) => kpi["4_Intra Frequency HOSR"]
      );
      let CQI = Object.values(kpiData["data"]).map((kpi) => kpi["CQI"]);
      let S1_Signaling_Setup = Object.values(kpiData["data"]).map(
        (kpi) => kpi["S1_Signaling_Setup"]
      );
      let RRC_Connect_User = Object.values(kpiData["data"]).map(
        (kpi) => kpi["RRC_Connect_User"]
      );
      let _3_E_RAB_Drop_Rate__ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["3_E-RAB Drop Rate(%)"]
      );
      let _6_User_throughput_DL__ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["6_User throughput DL"]
      );
      let _7_User_throughtput__UL = Object.values(kpiData["data"]).map(
        (kpi) => kpi["7_User throughtput UL"]
      );
      let Inter_Frequency__HOSR = Object.values(kpiData["data"]).map(
        (kpi) => kpi["Inter Frequency HOSR"]
      );
      let pmCellDowntime_Auto = Object.values(kpiData["data"]).map(
        (kpi) => kpi["pmCellDowntimeAuto"]
      );
      let pmCellDowntime_Man = Object.values(kpiData["data"]).map(
        (kpi) => kpi["pmCellDowntimeMan"]
      );
      let Traffic_Volume_UL__Gbytes = Object.values(kpiData["data"]).map(
        (kpi) => kpi["Traffic Volume UL (Gbytes)"]
      );
      let Traffic_Volume_DL__Gbytes = Object.values(kpiData["data"]).map(
        (kpi) => kpi["Traffic Volume DL (Gbytes)"]
      );
      let pmActiveUeDlSum = Object.values(kpiData["data"]).map(
        (kpi) => kpi["pmActiveUeDlSum"]
      );
      let _CSFB_to_UMTS = Object.values(kpiData["data"]).map(
        (kpi) => kpi["_CSFB to UMTS"]
      );
      let _CSFB_to__GSM = Object.values(kpiData["data"]).map(
        (kpi) => kpi["_CSFB to GSM"]
      );
      let User_throughput_DL_CA = Object.values(kpiData["data"]).map(
        (kpi) => kpi["User throughput DL CA"]
      );
      let RSSI_dbm_ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["RSSI (dbm)"]
      );
      let RSSI_PUCCH_dBm_ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["RSSI_PUCCH (dBm)"]
      );
      let CSFB_SR__ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["CSFB_SR%"]
      );
      let PRB_DL_New = Object.values(kpiData["data"]).map(
        (kpi) => kpi["PRB_DL_New"]
      );
      let PRB_UL_New = Object.values(kpiData["data"]).map(
        (kpi) => kpi["PRB_UL_New"]
      );
      let SINR_Pusch_dB_ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["SINR_Pusch(dB)"]
      );

      let QPSK__ = Object.values(kpiData["data"]).map((kpi) => kpi["QPSK%"]);
      let SpectralEfficiencybpshz__ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["Spectral Efficiency (bps/hz)[%]"]
      );
      let Average_DL__UE_Latency = Object.values(kpiData["data"]).map(
        (kpi) => kpi["Average DL UE Latency"]
      );
      let CellThroughputDLMbps_ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["Cell Throughput DL(Mbps)"]
      );
      let Cell_Throughput_UL_Mbps__ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["Cell Throughput UL(Mbps)"]
      );
      let UL_RLC_Bler_Rate_ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["UL RLC Bler Rate%"]
      );
      let DL_RLC_Bler_Rate__ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["DL RLC Bler Rate%"]
      );
      let User_throughput_UL_CA__ = Object.values(kpiData["data"]).map(
        (kpi) => kpi["User throughput UL CA"]
      );

      // Set individual KPI arrays
      setRpcConnectionRateArray(rrcConnectionRate);
      setUserThroughputDL(userDownloadRate);
      setUserThroughputUL(userUploadRate);
      setErabSuccessRate(erabSuccessRate);
      setTrafficVolumeUL(trafficVolumeUL);
      setTrafficVolumeDL(trafficVolumeDL);
      setHours(hourData);
      setCellAvailability(cellAvailability);
      setCity(cityData);
      set_9_LTE_Session_Continuity(_9_LTE_Session_Continuity_);
      set_16QAM_(_16QAM__);
      set_64QAM_(_64QAM_);
      set_256QAM_(_256QAM_);
      setCQI(CQI);
      setActive_users(Active_users);
      setIntraFrequencyHOSR(IntraFrequencyHOSR);
      setSpectralEfficiencybpshz(SpectralEfficiencybpshz__);
      setS1_Signaling_Setup(S1_Signaling_Setup);
      setRRC_Connect_User(RRC_Connect_User);
      set_3_E_RAB_Drop_Rate_(_3_E_RAB_Drop_Rate__);
      set_6_User_throughput_DL(_6_User_throughput_DL__);
      set_7_User_throughtput_UL(_7_User_throughtput__UL);
      set_Inter_Frequency_HOSR(Inter_Frequency__HOSR);
      setPmCellDowntimeAuto(pmCellDowntime_Auto);
      setPmCellDowntimeMan(pmCellDowntime_Man);
      setTraffic_Volume_UL__Gbytes(Traffic_Volume_UL__Gbytes);
      setTraffic_Volume_DL__Gbytes(Traffic_Volume_DL__Gbytes);
      setPmActiveUeDlSum(pmActiveUeDlSum);
      setCellThroughputDLMbps__(CellThroughputDLMbps_);
      setCell_Throughput_UL_Mbps_(Cell_Throughput_UL_Mbps__);
      set_CSFBtoUMTS(_CSFB_to_UMTS);
      set_CSFB_to_GSM(_CSFB_to__GSM);
      setRSSI_dbm_(RSSI_dbm_);
      setRSSI_PUCCH_dBm_(RSSI_PUCCH_dBm_);
      setUser_throughput_DL_CA(User_throughput_DL_CA);
      setCSFB_SR__(CSFB_SR__);
      setPRB_DL_New(PRB_DL_New);
      setPrbULNew(PRB_UL_New);
      setSINR_Pusch_dB(SINR_Pusch_dB_);
      setQPSK__(QPSK__);
      setAverage_DL_UE_Latency(Average_DL__UE_Latency);
      setUL_RLC_Bler_Rate__(UL_RLC_Bler_Rate_);
      setDL_RLC_Bler_Rate_(DL_RLC_Bler_Rate__);
      setUser_throughput_UL_CA(User_throughput_UL_CA__);

      setFileUploaded(true);
    } catch (error) {
      console.error("Error fetching KPI data:", error);
    } finally {
      setLoading(false);
    }
  };

  const UploadFileComponent = () => {
    return (
      <>
        <Card
          sx={{
            width: { lg: "60%", md: "70%", xs: "90%" },
            height: "700px",
          }}
        >
          <CardActionArea
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                width: "100%",
              }}
            >
              <Paper
                onDrop={(e) => {
                  e.preventDefault();
                  console.log(e.target);
                  //handleUploadFile()
                }}
                sx={{
                  height: "100%",
                  width: "100%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: {
                      md: "flex",
                      xs: "flex flex-grid flex-items-center",
                    },
                    alignItems: "center",
                    justifyContent: "center",
                    justifyItems: "center",
                    gap: 4,
                    p: 5,
                    border: "9px dashed darkgrey",
                    borderRadius: 10,
                    position: "relative", // Add this for positioning context
                  }}
                >
                  <FileUploadSection
                    id="file-upload-1"
                    onFileSelect={handleUploadFile}
                  />
                </Box>
              </Paper>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    width: 1,
    //overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
  });

  const VisuallyHiddenInput2 = ({
    id,
    type = "file",
    onChange,
    accept,
    ...props
  }) => (
    <input
      id={id}
      type={type}
      onChange={onChange}
      accept={accept}
      style={{
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        width: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
      }}
      {...props}
    />
  );

  const FileUploadSection = ({ id, onFileSelect }) => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file && onFileSelect) {
        onFileSelect(file);
      }
    };

    return (
      <>
        <label
          htmlFor={id}
          style={{
            cursor: "pointer",
            display: "block",
            textAlign: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" color="grey">
            Click or drop files to upload
          </Typography>
        </label>
        <VisuallyHiddenInput2
          id={id}
          type="file"
          onChange={handleFileChange}
          accept=".xlsx"
        />
      </>
    );
  };

  return (
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
            <SheetCityDateSelectionDialog
              dialogDataProp={sheetsNames}
              selectedSheetNameProp={setSelectedSheetName}
              handleSelectSheetnameChange={handleSheetNameSelected}
              onDialogClose={() => setShowSheetDialog(false)}
              citiesProp={citiesState}
              datesProp={dates}
            />
          )}

          {file && selectedSheetName && !showSheetDialog && (
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
                {!loading && (
                  <MainGrid
                    rrcConnectionRateProp={rpcConnectionRateArray}
                    userDownloadRate={userThroughputDL}
                    userUploadRate={userThroughputUL}
                    erabSuccessRateProp={erabSuccessRate}
                    uploadtTrafficProp={trafficVolumeUL}
                    downloadTrafficProp={trafficVolumeDL}
                    hourProp={hours}
                    cellAvailabilityProp={cellAvailability}
                    sessionContinuityProp={_9_LTE_Session_Continuity}
                    CityProp={city}
                    _9_LTE_Session_ContinuityProp={_9_LTE_Session_Continuity}
                    _16QAM_Prop={_16QAM_}
                    _64QAM_Prop={_64QAM_}
                    _256QAM_Prop={_256QAM_}
                    Active_usersProp={Active_users}
                    CellThroughputDLMbps_Prop={CellThroughputDLMbps__}
                    Cell_Throughput_UL_Mbps_Prop={CellThroughputDLMbps__}
                    IntraFrequencyHOSRProp={IntraFrequencyHOSR}
                    SpectralEfficiencybpshz__Prop={SpectralEfficiencybpshz___}
                    S1_Signaling_SetupProp={S1_Signaling_Setup}
                    _3_E_RAB_Drop_Rate_Prop={_3_E_RAB_Drop_Rate_}
                    RRC_Connect_UserProp={RRC_Connect_User}
                    _6_User_throughput_DLProp={_6_User_throughput_DL}
                    _7_User_throughtput__ULProp={_7_User_throughtput_UL}
                    Inter_Frequency_HOSRProp={Inter_Frequency_HOSR}
                    pmCellDowntimeAutoProp={pmCellDowntimeAuto}
                    pmCellDowntimeManProp={pmCellDowntimeMan}
                    Traffic_Volume_UL__Gbytes_Prop={Traffic_Volume_UL__Gbytes}
                    Traffic_Volume_DL__Gbytes_Prop={Traffic_Volume_DL__Gbytes}
                    pmActiveUeDlSumProp={pmActiveUeDlSum}
                    User_throughput_UL_CAProp={User_throughput_UL_CA_}
                    _CSFB_to_UMTSProp={_CSFBtoUMTS}
                    _CSFB_to_GSMProp={_CSFB_to_GSM}
                    User_throughput_DL_CAProp={User_throughput_DL_CA_}
                    RSSI_dbm_Prop={RSSI_dbm__}
                    RSSI_PUCCH_dBm_Prop={RSSI_PUCCH_dBm_}
                    CSFB_SR__Prop={CSFB_SR__}
                    PRB_DL_NewProp={PRB_DL_New}
                    PRB_UL_NewProp={PRB_UL_New}
                    CQIProp={CQI}
                    SINR_Pusch_dB_Prop={SINR_Pusch_dB}
                    QPSK_Prop={QPSK___}
                    Average_DL_UE_LatencyProp={Average_DL_UE_Latency}
                    UL_RLC_Bler_Rate_Prop={UL_RLC_Bler_Rate__}
                    DL_RLC_Bler_Rate_Prop={DL_RLC_Bler_Rate_}
                  />
                )}

                {loading && <CircularProgress />}
              </TabPanel>
              <TabPanel value="2">
                <Typography>No Data found</Typography>
              </TabPanel>
              <TabPanel value="3">
                <Typography>No Data found</Typography>
              </TabPanel>
            </TabContext>
          )}

          {!fileUploaded && <UploadFileComponent />}
        </Stack>
      </Box>
    </Box>
  );
}
