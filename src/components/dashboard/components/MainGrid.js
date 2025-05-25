import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard from "./StatCard";
import ThroughtputLineChart from "./custom/ThroughtputLineChart";
import KpiDataGrid from "./KpiDataGrid";

export default function MainGrid({
  rrcConnectionRateProp,
  userDownloadRate,
  userUploadRate,
  erabSuccessRateProp,
  uploadtTrafficProp,
  downloadTrafficProp,
  hourProp,
  cellAvailabilityProp,
  sessionContinuityProp,
  sheetName, // Add sheetName as a prop
  uploadedFile, // Add uploadedFile as a prop
  IntraFrequencyHOSRProp,
  pmCellDowntimeAutoProp,
  pmCellDowntimeManProp,
  TrafficVolumeUL_GbytesProp,
  TrafficVolumeDL_GbytesProp,
  Active_usersProp,
  pmActiveUeDlSumProp,
  _CSFBtoUMTSProp,
  _CSFBtoGSMProp,
  UserthroughputDLCAProp,
  CSFB_SR__Prop,
  PRB_UL_NewProp,
  CQIProp,
  PRB_DL_NewProp,
  SINR_PuschdBProp,
  QPSK__Prop,
  _16QAM__Prop,
  _64QAM__Prop,
  _256QAM__Prop,
  SpectralEfficiencybpshz__Prop,
  UserthroughputULCAProp,
  RSSI_dbmProp,
  RSSI_PUCCHdBmProp,
  DLRLCBlerRate_Prop,
  ULRLCBlerRate_Prop,
  CellThroughputDLMbps_Prop,
  CellThroughputULMps_Prop,
  CityProp,
  LTE_Session_ContinuityProp,
}) {
  const [columnNames, setColumnNames] = useState();
  const [rrcConnectionRate, setRrcConnectionRate] = useState(rrcConnectionRateProp);
  const [userThroughputDL, setUserThroughtputDL] = useState(userDownloadRate);
  const [userThroughputUL, setUserThroughtputUL] = useState(userUploadRate);
  const [erabSuccessRate, setErabSuccessRate] = useState(erabSuccessRateProp);
  const [uploadtTraffic, setUploadtTraffic] = useState(uploadtTrafficProp);
  const [downloadTraffic, setDownloadtTraffic] = useState(downloadTrafficProp);
  const [cellAvailability, setCellAvailability] = useState(cellAvailabilityProp);
  const [hours, setHours] = useState(hourProp);
  const [IntraFrequencyHOSR, setIntraFrequencyHOSR] = useState(IntraFrequencyHOSRProp);
  const [pmCellDowntimeAuto, setPmCellDowntimeAuto] = useState(pmCellDowntimeAutoProp);
  const [pmCellDowntimeMan, setPmCellDowntimeMan] = useState(pmCellDowntimeManProp);
  const [TrafficVolumeUL_Gbytes, setTrafficVolumeUL_Gbytes] = useState(TrafficVolumeUL_GbytesProp);
  const [TrafficVolumeDL_Gbytes, setTrafficVolumeDL_Gbytes] = useState(TrafficVolumeDL_GbytesProp);
  const [Active_users, setActive_users] = useState(Active_usersProp);
  const [pmActiveUeDlSum, setPmActiveUeDlSum] = useState(pmActiveUeDlSumProp);
  const [_CSFBtoUMTS, set_CSFBtoUMTS] = useState(_CSFBtoUMTSProp);
  const [_CSFBtoGSM, set_CSFBtoGSM] = useState(_CSFBtoGSMProp);
  const [UserthroughputDLCA, setUserthroughputDLCA] = useState(UserthroughputDLCAProp);
  const [CSFB_SR_, setCSFB_SR_] = useState(CSFB_SR__Prop);
  const [PRB_UL_New, setPRB_UL_New] = useState(PRB_UL_NewProp);
  const [CQI, setCQI] = useState(CQIProp);
  const [PRB_DL_New, setPRB_DL_New] = useState(PRB_DL_NewProp);
  const [SINR_PuschdB, setSINR_PuschdB] = useState(SINR_PuschdBProp);
  const [QPSK_, setQPSK_] = useState(QPSK__Prop);
  const [_16QAM_, set_16QAM_] = useState(_16QAM__Prop);
  const [_64QAM_, set_64QAM_] = useState(_64QAM__Prop);
  const [_256QAM_, set_256QAM_] = useState(_256QAM__Prop);
  const [SpectralEfficiencybpshz_, setSpectralEfficiencybpshz_] = useState(SpectralEfficiencybpshz__Prop);
  const [UserthroughputULCA, setUserthroughputULCA] = useState(UserthroughputULCAProp);
  const [RSSI_dbm, setRSSI_dbm] = useState(RSSI_dbmProp);
  const [RSSI_PUCCHdBm, setRSSI_PUCCHdBm] = useState(RSSI_PUCCHdBmProp);
  const [DLRLCBlerRate, setDLRLCBlerRate] = useState(DLRLCBlerRate_Prop);
  const [ULRLCBlerRate, setULRLCBlerRate] = useState(ULRLCBlerRate_Prop);
  const [CellThroughputDLMbps, setCellThroughputDLMbps] = useState(CellThroughputDLMbps_Prop);
  const [CellThroughputULMps, setCellThroughputULMps] = useState(CellThroughputULMps_Prop);
  const [city, setCity] = useState(CityProp);
  const [lteSessionContinuity, setLTESessionContinuity] = useState(LTE_Session_ContinuityProp);


  // Calculate averages for the cards
  const [rrcConnectionRateAvg, setRrcConnectionRateAvg] = useState(
    rrcConnectionRate.reduce((a, b) => a + b) / rrcConnectionRate.length
  );
  const [userThroughputDLAvg, setUserThroughputDLAvg] = useState(
    userThroughputDL.reduce((a, b) => a + b) / userThroughputDL.length
  );
  const [userThroughputULAvg, setUserThroughputULAvg] = useState(
    userThroughputUL.reduce((a, b) => a + b) / userThroughputUL.length
  );
  const [erabSuccessRateAvg, setErabSuccessRateAvg] = useState(
    erabSuccessRate.reduce((a, b) => a + b) / erabSuccessRate.length
  );

  // Calculate averages for the charts
  const data = [
    {
      title: "RRC Connection success rate",
      value: rrcConnectionRateAvg.toFixed(2) + " AVG.",
      interval: "Last 30 days",
      trend: "neutral",
      data: rrcConnectionRate,
      hours: hours,
    },
    {
      title: "User throughput DL",
      value: userThroughputDLAvg.toFixed(2) + " AVG.",
      interval: "Last 30 days",
      trend: "neutral",
      data: userThroughputDL,
      hours: hours,
    },
    {
      title: "User throughput UL",
      value: userThroughputULAvg.toFixed(2) + " AVG.",
      interval: "Last 30 days",
      trend: "neutral",
      data: userThroughputUL,
      hours: hours,
    },
    {
      title: "ERAB Setup Success Rate",
      value: erabSuccessRateAvg.toFixed(2) + " AVG.",
      interval: "Last 30 days",
      trend: "neutral",
      data: erabSuccessRate,
      hours: hours,
    },
  ];
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Overview
        </Typography>
        <Grid
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          {data.map((card, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard {...card} />
            </Grid>
          ))}
          <Grid size={{ xs: 12, md: 6 }}>
            <SessionsChart
          uploadTrafficProp={uploadtTraffic}
          downloadTrafficProp={downloadTraffic}
          hourProp={hours}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <PageViewsBarChart
          cellAvailabilityProp={cellAvailability}
          hoursProp={hours}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={1}>
          <Grid size={{ xs: 12, lg: 9 }}>
            <ThroughtputLineChart
          throughtputDataUlProp={userThroughputUL}
          throughtputDataDlProp={userThroughputDL}
          hoursDataProp={hours}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={1}>
          <Grid size={{ xs: 12, lg: 9 }}>
            <KpiDataGrid
          throughtputDataUlProp={userThroughputUL}
          throughtputDataDlProp={userThroughputDL}
          hoursDataProp={hours} // Make sure hoursProp is a non-empty array of strings like "2024-05-25 13"
          rrcConnectionRateProp={rrcConnectionRate}
          erabSuccessRateProp={erabSuccessRate}
          uploadtTrafficProp={uploadtTraffic}
          downloadTrafficProp={downloadTraffic}
          IntraFrequencyHOSRProp={IntraFrequencyHOSR}
          pmCellDowntimeAutoProp={pmCellDowntimeAuto}
          pmCellDowntimeManProp={pmCellDowntimeMan}
          TrafficVolumeUL_GbytesProp={TrafficVolumeUL_Gbytes}
          TrafficVolumeDL_GbytesProp={TrafficVolumeDL_Gbytes}
          Active_usersProp={Active_users}
          pmActiveUeDlSumProp={pmActiveUeDlSum}
          _CSFBtoUMTSProp={_CSFBtoUMTS}
          _CSFBtoGSMProp={_CSFBtoGSM}
          UserthroughputDLCAProp={UserthroughputDLCA}
          CSFB_SR__Prop={CSFB_SR_}
          PRB_UL_NewProp={PRB_UL_New}
          CQIProp={CQI}
          PRB_DL_NewProp={PRB_DL_New}
          SINR_PuschdBProp={SINR_PuschdB}
          QPSK__Prop={QPSK_}
          _16QAM__Prop={_16QAM_}
          _64QAM__Prop={_64QAM_}
          _256QAM__Prop={_256QAM_}
          SpectralEfficiencybpshz__Prop={SpectralEfficiencybpshz_}
          UserthroughputULCAProp={UserthroughputULCA}
          RSSI_dbmProp={RSSI_dbm}
          RSSI_PUCCHdBmProp={RSSI_PUCCHdBm}
          DLRLCBlerRate_Prop={DLRLCBlerRate}
          ULRLCBlerRate_Prop={ULRLCBlerRate}
          CellThroughputDLMbps_Prop={CellThroughputDLMbps}
          CellThroughputULMps_Prop={CellThroughputULMps}
          CityProp={city}
          LTE_Session_ContinuityProp={lteSessionContinuity}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={1}>
          <Grid size={{ xs: 12, lg: 9 }}>
            {/*<ContentTable sheetName={sheetName} file={uploadedFile} />*/}
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
