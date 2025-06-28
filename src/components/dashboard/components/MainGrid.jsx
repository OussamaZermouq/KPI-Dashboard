import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard from "./StatCard";
import ThroughtputLineChart from "./custom/ThroughtputLineChart";
import KpiDataGrid from "./KpiDataGrid";
import RrcConnectionSuccessLineChart from "./custom/RrcConnectionSuccessLineChart";
import SessionContinuityLinechartArea from "./custom/SessionContinuityLineChartArea";
import CellAvailabilityLineChart from "./custom/CellAvailabityLineChart";
import BiaxialLineChart from "./custom/BiaxialLineChart";

export default function MainGrid({
  rrcConnectionRateProp,
  userDownloadRate,
  userUploadRate,
  erabSuccessRateProp,
  uploadtTrafficProp,
  downloadTrafficProp,
  hourProp,
  sessionContinuityProp,
  sheetName, // Add sheetName as a prop
  uploadedFile, // Add uploadedFile as a prop
  IntraFrequencyHOSRProp,
  pmCellDowntimeAutoProp,
  pmCellDowntimeManProp,
  User_throughput_DL_CAProp,
  TrafficVolumeUL_GbytesProp,
  TrafficVolumeDL_GbytesProp,
  Active_usersProp,
  pmActiveUeDlSumProp,
  _CSFBtoGSMProp,
  UserthroughputDLCAProp,
  CQIProp,
  SINR_PuschdBProp,
  SpectralEfficiencybpshz__Prop,
  UserthroughputULCAProp,
  RSSI_dbm_Prop,
  RSSI_PUCCH_dBm_Prop,
  DLRLCBlerRate_Prop,
  ULRLCBlerRate_Prop,
  CellThroughputDLMbps_Prop,
  Cell_Throughput_UL_Mbps_Prop,
  _CSFB_to_GSMProp,
  CityProp,
  _9_LTE_Session_ContinuityProp,
  cellAvailabilityProp,
  S1_Signaling_SetupProp,
  RRC_Connect_UserProp,
  _3_E_RAB_Drop_Rate_Prop,
  _6_User_throughput_DLProp,
  _7_User_throughtput__ULProp,
  Inter_Frequency_HOSRProp,
  Traffic_Volume_UL__Gbytes_Prop,
  Traffic_Volume_DL__Gbytes_Prop,
  _CSFB_to_UMTSProp,
  CSFB_SR__Prop,
  PRB_DL_NewProp,
  PRB_UL_NewProp,
  SINR_Pusch_dB_Prop,
  QPSK_Prop,
  _16QAM_Prop,
  _64QAM_Prop,
  _256QAM_Prop,
  Average_DL_UE_LatencyProp,
  UL_RLC_Bler_Rate_Prop,
  DL_RLC_Bler_Rate_Prop,
  User_throughput_UL_CAProp,
}) {
  const [columnNames, setColumnNames] = useState();
  const [rrcConnectionRate, setRrcConnectionRate] = useState(
    rrcConnectionRateProp
  );
  const [userThroughputDL, setUserThroughtputDL] = useState(userDownloadRate);
  const [userThroughputUL, setUserThroughtputUL] = useState(userUploadRate);
  const [erabSuccessRate, setErabSuccessRate] = useState(erabSuccessRateProp);
  const [uploadtTraffic, setUploadtTraffic] = useState(uploadtTrafficProp);
  const [downloadTraffic, setDownloadtTraffic] = useState(downloadTrafficProp);
  const [cellAvailability, setCellAvailability] =
    useState(cellAvailabilityProp);
  const [hours, setHours] = useState(hourProp);
  const [IntraFrequencyHOSR, setIntraFrequencyHOSR] = useState(
    IntraFrequencyHOSRProp
  );
  const [pmCellDowntimeAuto, setPmCellDowntimeAuto] = useState(
    pmCellDowntimeAutoProp
  );
  const [pmCellDowntimeMan, setPmCellDowntimeMan] = useState(
    pmCellDowntimeManProp
  );
  const [TrafficVolumeUL_Gbytes, setTrafficVolumeUL_Gbytes] = useState(
    TrafficVolumeUL_GbytesProp
  );
  const [TrafficVolumeDL_Gbytes, setTrafficVolumeDL_Gbytes] = useState(
    TrafficVolumeDL_GbytesProp
  );
  const [Active_users, setActive_users] = useState(Active_usersProp);
  const [pmActiveUeDlSum, setPmActiveUeDlSum] = useState(pmActiveUeDlSumProp);
  const [_CSFBtoUMTS, set_CSFBtoUMTS] = useState(_CSFB_to_UMTSProp);
  const [_CSFBtoGSM, set_CSFBtoGSM] = useState(_CSFBtoGSMProp);
  const [UserthroughputDLCA, setUserthroughputDLCA] = useState(
    UserthroughputDLCAProp
  );
  const [CSFB_SR_, setCSFB_SR_] = useState(CSFB_SR__Prop);
  const [PRB_UL_New, setPRB_UL_New] = useState(PRB_UL_NewProp);
  const [CQI, setCQI] = useState(CQIProp);
  const [PRB_DL_New, setPRB_DL_New] = useState(PRB_DL_NewProp);
  const [SINR_PuschdB, setSINR_PuschdB] = useState(SINR_PuschdBProp);
  const [QPSK_, setQPSK_] = useState(QPSK_Prop);
  const [_16QAM_, set_16QAM_] = useState(_16QAM_Prop);
  const [_64QAM_, set_64QAM_] = useState(_64QAM_Prop);
  const [_256QAM_, set_256QAM_] = useState(_256QAM_Prop);
  const [SpectralEfficiencybpshz_, setSpectralEfficiencybpshz_] = useState(
    SpectralEfficiencybpshz__Prop
  );
  const [UserthroughputULCA, setUserthroughputULCA] = useState(
    UserthroughputULCAProp
  );
  const [RSSI_dbm, setRSSI_dbm] = useState(RSSI_dbm_Prop);
  const [RSSI_PUCCHdBm, setRSSI_PUCCHdBm] = useState(RSSI_PUCCH_dBm_Prop);
  const [DLRLCBlerRate, setDLRLCBlerRate] = useState(DLRLCBlerRate_Prop);
  const [ULRLCBlerRate, setULRLCBlerRate] = useState(ULRLCBlerRate_Prop);
  const [CellThroughputDLMbps, setCellThroughputDLMbps] = useState(
    CellThroughputDLMbps_Prop
  );
  const [CellThroughputULMps, setCellThroughputULMps] = useState(
    Cell_Throughput_UL_Mbps_Prop
  );
  const [city, setCity] = useState(CityProp);
  const [lteSessionContinuity, setLTESessionContinuity] = useState(
    _9_LTE_Session_ContinuityProp
  );
  const [S1_Signaling_Setup, setS1_Signaling_Setup] = useState(
    S1_Signaling_SetupProp
  );
  const [RRC_Connect_User, setRRC_Connect_User] =
    useState(RRC_Connect_UserProp);
  const [_2_ERAB_Setup_Success_Rate, set_2_ERAB_Setup_Success_Rate] =
    useState(erabSuccessRateProp);
  const [_3_E_RAB_Drop_Rate_, set_3_E_RAB_Drop_Rate_] = useState(
    _3_E_RAB_Drop_Rate_Prop
  );
  const [_6_User_throughput_DL, set_6_User_throughput_DL] = useState(
    _6_User_throughput_DLProp
  );
  const [_7_User_throughtput__UL, set_7_User_throughtput__UL] = useState(
    _7_User_throughtput__ULProp
  );
  const [Inter_Frequency_HOSR, setInter_Frequency__HOSR] = useState(
    Inter_Frequency_HOSRProp
  );
  const [Traffic_Volume_UL__Gbytes, setTraffic_Volume_UL__Gbytes] = useState(
    Traffic_Volume_UL__Gbytes_Prop
  );
  const [Traffic_Volume_DL__Gbytes, setTraffic_Volume_DL__Gbytes] = useState(
    Traffic_Volume_DL__Gbytes_Prop
  );
  // const [_CSFB_to_UMTS, set_CSFBtoUMTS] = useState(_CSFB_to_UMTSProp);
  const [_CSFB_to_UMTS, set_CSFB_to_UMTS] = useState(_CSFB_to_UMTSProp);
  const [User_throughput_DL_CA, setUser_throughput_DL_CA] = useState(
    User_throughput_DL_CAProp
  );
  const [RSSI_dbm_, setRSSI_dbm_] = useState(RSSI_dbm_Prop);
  const [RSSI_PUCCH_dBm_, setRSSI_PUCCH_dBm_] = useState(RSSI_PUCCH_dBm_Prop);
  const [CSFB_SR__, setCSFB_SR__] = useState(CSFB_SR__Prop);
  const [_CSFB_to_GSM, set_CSFB_to_GSM] = useState(_CSFB_to_GSMProp);
  const [SINR_Pusch_dB, setSINR_Pusch_dB] = useState(SINR_Pusch_dB_Prop);
  const [Average_DL_UE_Latency, setAverage_DL_UE_Latency] = useState(
    Average_DL_UE_LatencyProp
  );
  const [UL_RLC_Bler_Rate_, setUL_RLC_Bler_Rate_Prop] = useState(
    UL_RLC_Bler_Rate_Prop
  );
  const [DL_RLC_Bler_Rate_, setDL_RLC_Bler_Rate_Prop] = useState(
    DL_RLC_Bler_Rate_Prop
  );
  const [User_throughput_UL_CA, setUser_throughput_UL_CA] = useState(
    User_throughput_UL_CAProp
  );

  const [sessionContinuity, setSessionContinuity] = useState(
    sessionContinuityProp
  );


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

      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ThroughtputLineChart
            throughtputDataUlProp={userThroughputUL}
            throughtputDataDlProp={userThroughputDL}
            hoursProp={hours}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <RrcConnectionSuccessLineChart
            rrcConnectionRateProp={rrcConnectionRate}
            hoursProp={hours}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <SessionContinuityLinechartArea
            sessionContinuityProp={sessionContinuity}
            hoursProp={hours}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CellAvailabilityLineChart
            cellAvailabilityProp={cellAvailability}
            hoursProp={hours}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BiaxialLineChart />
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={1}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <KpiDataGrid
            throughtputDataUlProp={userThroughputUL}
            throughtputDataDlProp={userThroughputDL}
            hoursProp={hours}
            _1_RRC_Connection_Success_RateProp={rrcConnectionRate}
            _2_ERAB_Setup_Success_RateProp={_2_ERAB_Setup_Success_Rate}
            uploadtTrafficProp={uploadtTraffic}
            downloadTrafficProp={downloadTraffic}
            _4_Intra_Frequency_HOSRProp={IntraFrequencyHOSR}
            pmCellDowntimeAutoProp={pmCellDowntimeAuto}
            pmCellDowntimeManProp={pmCellDowntimeMan}
            TrafficVolumeUL_GbytesProp={TrafficVolumeUL_Gbytes}
            TrafficVolumeDL_GbytesProp={TrafficVolumeDL_Gbytes}
            Active_usersProp={Active_users}
            pmActiveUeDlSumProp={pmActiveUeDlSum}
            _CSFB_to_UMTSProp={_CSFB_to_UMTS}
            UserthroughputDLCAProp={UserthroughputDLCA}
            SINR_PuschdBProp={SINR_PuschdB}
            _16QAM_Prop={_16QAM_}
            _64QAM_Prop={_64QAM_}
            _256QAM_Prop={_256QAM_}
            Spectral_Efficiency__bps_hz___Prop={SpectralEfficiencybpshz_}
            UserthroughputULCAProp={UserthroughputULCA}
            RSSI_PUCCHdBmProp={RSSI_PUCCHdBm}
            DLRLCBlerRate_Prop={DLRLCBlerRate}
            ULRLCBlerRate_Prop={ULRLCBlerRate}
            CellThroughputDLMbps_Prop={CellThroughputDLMbps}
            Cell_Throughput_UL_Mbps_Prop={CellThroughputULMps}
            cityProp={city}
            _9_LTE_Session_ContinuityProp={lteSessionContinuity}
            cellAvailabilityProp={cellAvailability}
            S1_Signaling_SetupProp={S1_Signaling_Setup}
            RRC_Connect_UserProp={RRC_Connect_User}
            _3_E_RAB_Drop_Rate_Prop={_3_E_RAB_Drop_Rate_}
            _6_User_throughput_DLProp={_6_User_throughput_DL}
            _7_User_throughtput_ULProp={_7_User_throughtput__UL}
            Inter_Frequency_HOSRProp={Inter_Frequency_HOSR}
            Traffic_Volume_UL__Gbytes_Prop={Traffic_Volume_UL__Gbytes}
            Traffic_Volume_DL__Gbytes_Prop={Traffic_Volume_DL__Gbytes}
            User_throughput_UL_CAProp={User_throughput_UL_CA}
            _CSFB_to_GSMProp={_CSFB_to_GSM}
            User_throughput_DL_CAProp={User_throughput_DL_CA}
            RSSI_dbm_Prop={RSSI_dbm_}
            RSSI_PUCCH_dBm_Prop={RSSI_PUCCH_dBm_}
            CSFB_SR__Prop={CSFB_SR__}
            PRB_DL_NewProp={PRB_DL_New}
            PRB_UL_NewProp={PRB_UL_New}
            CQIProp={CQI}
            SINR_Pusch_dB_Prop={SINR_Pusch_dB}
            QPSK_Prop={QPSK_}
            Average_DL_UE_LatencyProp={Average_DL_UE_Latency}
            UL_RLC_Bler_Rate_Prop={UL_RLC_Bler_Rate_}
            DL_RLC_Bler_Rate_Prop={DL_RLC_Bler_Rate_}
          />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
