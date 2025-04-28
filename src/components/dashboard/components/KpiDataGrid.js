import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Tooltip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

// Filter component for date and hour selection
function FilterComponent({ hoursDataProp = [], onFilter }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  // Fix: Only split if h is a string and contains a space
  const uniqueDates = Array.from(
    new Set(
      hoursDataProp
        .filter(h => typeof h === "string" && h.includes(" "))
        .map(h => h.split(" ")[0])
    )
  );
  const uniqueHours = Array.from(
    new Set(
      hoursDataProp
        .filter(h => typeof h === "string" && h.includes(" "))
        .map(h => h.split(" ")[1])
    )
  );
  return (
    <div style={{ marginBottom: 16 }}>
      <label>Date: </label>
      <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)}>
        <option value="">All</option>
        {uniqueDates.map(date => (
          <option key={date} value={date}>{date}</option>
        ))}
      </select>
      <label style={{ marginLeft: 8 }}>Hour: </label>
      <select value={selectedHour} onChange={e => setSelectedHour(e.target.value)}>
        <option value="">All</option>
        {uniqueHours.map(hour => (
          <option key={hour} value={hour}>{hour}</option>
        ))}
      </select>
      <button style={{ marginLeft: 8 }} onClick={() => onFilter(selectedDate, selectedHour)}>Filter</button>
    </div>
  );
}

export default function KpiDataGrid({ 
  rrcConnectionRateProp,
  userDownloadRate,
  userUploadRate,
  erabSuccessRateProp,
  uploadtTrafficProp,
  downloadTrafficProp,
  cellAvailabilityProp,
  sessionContinuityProp,
  IntraFrequencyHOSRProp,
  LTE_Session_ContinuityProp,
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
  hoursDataProp,
  cityProb,
 }) {
  const [rrcConnectionRate, setRrcConnectionRate] = useState(rrcConnectionRateProp);
  const [userThroughputDL, setUserThroughputDL] = useState(userDownloadRate);
  const [userThroughputUL, setUserThroughputUL] = useState(userUploadRate);
  const [erabSuccessRate, setErabSuccessRate] = useState(erabSuccessRateProp);
  const [uploadtTraffic, setUploadtTraffic] = useState(uploadtTrafficProp);
  const [downloadTraffic, setDownloadtTraffic] = useState(downloadTrafficProp);
  const [cellAvailability, setCellAvailability] = useState(cellAvailabilityProp);
  const [hours, setHours ] = useState(hoursDataProp);
  const [sessionContinuity, setSessionContinuity] = useState(sessionContinuityProp);
  const [intraFrequencyHOSR, setIntraFrequencyHOSR] = useState(IntraFrequencyHOSRProp);
  const [lteSessionContinuityProb, setLteSessionContinuityProb] = useState(LTE_Session_ContinuityProp);
  const [pmCellDowntimeAuto, setPmCellDowntimeAuto] = useState(pmCellDowntimeAutoProp);
  const [pmCellDowntimeMan, setPmCellDowntimeMan] = useState(pmCellDowntimeManProp);
  const [trafficVolumeULGbytes, setTrafficVolumeULGbytes] = useState(TrafficVolumeUL_GbytesProp);
  const [trafficVolumeDLGbytes, setTrafficVolumeDLGbytes] = useState(TrafficVolumeDL_GbytesProp);
  const [activeUsers, setActiveUsers] = useState(Active_usersProp);
  const [pmActiveUeDlSum, setPmActiveUeDlSum] = useState(pmActiveUeDlSumProp);
  const [_CSFBtoUMTS, setCSFBtoUMTS] = useState(_CSFBtoUMTSProp);
  const [_CSFBtoGSM, setCSFBtoGSM] = useState(_CSFBtoGSMProp);
  const [userThroughputDLCA, setUserThroughputDLCA] = useState(UserthroughputDLCAProp);
  const [CSFB_SR, setCSFB_SR] = useState(CSFB_SR__Prop);
  const [prbULNew, setPrbULNew] = useState(PRB_UL_NewProp);
  const [cqi, setCqi] = useState(CQIProp);
  const [prbDLNew, setPrbDLNew] = useState(PRB_DL_NewProp);
  const [sinrPuschdB, setSinrPuschdB] = useState(SINR_PuschdBProp);
  const [qpsk, setQpsk] = useState(QPSK__Prop);
  const [q16qam, setQ16qam] = useState(_16QAM__Prop);
  const [q64qam, setQ64qam] = useState(_64QAM__Prop);
  const [q256qam, setQ256qam] = useState(_256QAM__Prop);
  const [spectralEfficiencyBpshz, setSpectralEfficiencyBpshz] = useState(SpectralEfficiencybpshz__Prop);
  const [userThroughputULCA, setUserThroughputULCA] = useState(UserthroughputULCAProp);
  const [rssiDbm, setRssiDbm] = useState(RSSI_dbmProp);
  const [rssiPUCCHdBm, setRssiPUCCHdBm] = useState(RSSI_PUCCHdBmProp);
  const [dlRLCBlerRate, setDlRLCBlerRate] = useState(DLRLCBlerRate_Prop);
  const [ulRLCBlerRate, setUlRLCBlerRate] = useState(ULRLCBlerRate_Prop);
  const [cellThroughputDLMbps, setCellThroughputDLMbps] = useState(CellThroughputDLMbps_Prop);
  const [cellThroughputULMps, setCellThroughputULMps] = useState(CellThroughputULMps_Prop);
  const [city, setCity] = useState(cityProb); 
  const [filteredIndexes, setFilteredIndexes] = useState(null);
  
  const isValidKpi = (value) => {
    // Define your validation logic here
    return value !== undefined && value !== null && value > 0;
  };

  const handleFilter = (date, hour) => {
    if (!date && !hour) {
      setFilteredIndexes(null);
      return;
    }
    const indexes = (Array.isArray(hoursDataProp) ? hoursDataProp : []).map((h, idx) => {
      const [hDate, hHour] = h.split(" ");
      if ((date ? hDate === date : true) && (hour ? hHour === hour : true)) {
        return idx;
      }
      return null;
    }).filter(idx => idx !== null);
    setFilteredIndexes(indexes);
  };

  const filterByIndexes = (arr) =>
    filteredIndexes ? filteredIndexes.map(idx => arr[idx]) : arr;

  // Helper to get filtered value for a KPI array
  const getFilteredValue = (arr) => {
    const filtered = filterByIndexes(arr);
    // If array is empty or not an array, return empty string
    if (!Array.isArray(filtered) || filtered.length === 0) return '';
    // If only one value, return it
    if (filtered.length === 1) return filtered[0];
    // Otherwise, join values as comma-separated
    return filtered.join(', ');
  };

  // Map KPI names to their corresponding arrays
  const kpiMap = {
    'Cell Availability': cellAvailability,
    'RRC Connection Rate': rrcConnectionRate,
    'User Download Rate': userThroughputDL,
    'User Upload Rate': userThroughputUL,
    'ERAB Success Rate': erabSuccessRate,
    'Upload Traffic': uploadtTraffic,
    'Download Traffic': downloadTraffic,
    'Session Continuity': sessionContinuity,
    'Intra Frequency HOSR': intraFrequencyHOSR,
    'LTE Session Continuity': lteSessionContinuityProb,
    'PM Cell Downtime Auto': pmCellDowntimeAuto,
    'PM Cell Downtime Manual': pmCellDowntimeMan,
    'Traffic Volume UL (Gbytes)': trafficVolumeULGbytes,
    'Traffic Volume DL (Gbytes)': trafficVolumeDLGbytes,
    'Active Users': activeUsers,
    'PM Active Ue DL Sum': pmActiveUeDlSum,
    'CSFB to UMTS': _CSFBtoUMTS,
    'CSFB to GSM': _CSFBtoGSM,
    'User Throughput DL CA': userThroughputDLCA,
    'CSFB SR': CSFB_SR,
    'PRB UL New': prbULNew,
    'CQI': cqi,
    'PRB DL New': prbDLNew,
    'SINR Pusch dB': sinrPuschdB,
    'QPSK': qpsk,
    '16QAM': q16qam,
    '64QAM': q64qam,
    '256QAM': q256qam,
    'Spectral Efficiency bps/Hz': spectralEfficiencyBpshz,
    'User Throughput UL CA': userThroughputULCA,
    'RSSI dBm': rssiDbm,
    'RSSI PUCCH dBm': rssiPUCCHdBm,
    'DL RLC BLER Rate': dlRLCBlerRate,
    'UL RLC BLER Rate': ulRLCBlerRate,
    'Cell Throughput DL Mbps': cellThroughputDLMbps,
    'Cell Throughput UL Mbps': cellThroughputULMps,
  };

  const columns = [
    { field: "kpi", headerName: "KPI", flex: 1 },
    { field: "VAleur", headerName: "VAleur", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "hours", headerName: "Hours", flex: 1 }, // Add Hours column
    {
      field: "state",
      headerName: "State",
      flex: 1,
      renderCell: (params) => {
        return isValidKpi(params.row.avg) ? (
          <CheckCircleOutlineIcon color="success" />
        ) : (
          <ErrorOutlineIcon color="error" />
        );
      },
    },
  ];

  const rows = [
    { id: 1, kpi: "Cell Availability"},
    { id: 2, kpi: "RRC Connection Rate" },
    { id: 3, kpi: "User Download Rate"},
    { id: 4, kpi: "User Upload Rate"  },
    { id: 5, kpi: "ERAB Success Rate" },
    { id: 6, kpi: "Upload Traffic" },
    { id: 7, kpi: "Download Traffic" },
    { id: 8, kpi: "Session Continuity" },
    { id: 9, kpi: "Intra Frequency HOSR" },
    { id: 10, kpi: "LTE Session Continuity" },
    { id: 11, kpi: "PM Cell Downtime Auto" },
    { id: 12, kpi: "PM Cell Downtime Manual" },
    { id: 13, kpi: "Traffic Volume UL (Gbytes)" },
    { id: 14, kpi: "Traffic Volume DL (Gbytes)" },
    { id: 15, kpi: "Active Users" },
    { id: 16, kpi: "PM Active Ue DL Sum" },
    { id: 17, kpi: "CSFB to UMTS" },
    { id: 18, kpi: "CSFB to GSM" },
    { id: 19, kpi: "User Throughput DL CA" },
    { id: 20, kpi: "CSFB SR" },
    { id: 21, kpi: "PRB UL New" },
    { id: 22, kpi: "CQI" },
    { id: 23, kpi: "PRB DL New" },
    { id: 24, kpi: "SINR Pusch dB" },
    { id: 25, kpi: "QPSK" },
    { id: 26, kpi: "16QAM" },
    { id: 27, kpi: "64QAM" },
    { id: 28, kpi: "256QAM" },
    { id: 29, kpi: "Spectral Efficiency bps/Hz" },
    { id: 30, kpi: "User Throughput UL CA" },
    { id: 31, kpi: "RSSI dBm" },
    { id: 32, kpi: "RSSI PUCCH dBm" },
    { id: 33, kpi: "DL RLC BLER Rate" },
    { id: 34, kpi : "UL RLC BLER Rate"},
    { id :35 ,kpi : "Cell Throughput DL Mbps"},
  ];

  // Enhance rows to show filtered KPI value, city, and hours for each row
  const enhancedRows = rows.map(row => ({
    ...row,
    VAleur: getFilteredValue(kpiMap[row.kpi]),
    city: getFilteredValue(cityProb),
    hours: getFilteredValue(hoursDataProp), // Add hours value to each row
  }));
 
return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <FilterComponent hours={Array.isArray(hoursDataProp) ? hoursDataProp : []} onFilter={handleFilter} />
      {/* KPI Trend Table */}
      <Box sx={{ height: 500, width: "100%", mb: 4 }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          KPI Trend Table
        </Typography>
        <DataGrid
          rows={enhancedRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
