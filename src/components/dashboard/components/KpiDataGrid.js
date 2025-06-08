import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Tooltip, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function KpiDataGrid({ 
    DateProp,
    _1_RRC_Connection_Success_RateProp,
    _2_ERAB_Setup_Success_RateProp,
    S1_Signaling_SetupProp,
    RRC_Connect_UserProp,
    _3_E_RAB_Drop_Rate_Prop,
    _6_User_throughput_DLProp, 
    _7_User_throughtput_ULProp,
    _4_Intra_Frequency_HOSRProp,
    Inter_Frequency_HOSRProp,
    _9_LTE_Session_ContinuityProp,
    cellAvailabilityProp,
    pmCellDowntimeAutoProp,
    pmCellDowntimeManProp,
    Active_usersProp,
    pmActiveUeDlSumProp,
    _16QAM_Prop,
    _64QAM_Prop,
    _256QAM_Prop,
    Spectral_Efficiency__bps_hz___Prop,
    hoursProp,
    cityProp,
    Traffic_Volume_UL__Gbytes_Prop,
    Traffic_Volume_DL__Gbytes_Prop,
    _CSFB_to_UMTSProp,
    _CSFB_to_GSMProp,
    User_throughput_DL_CAProp,
    CSFB_SR__Prop,
    PRB_DL_NewProp,
    PRB_UL_NewProp,
    CQIProp,
    SINR_Pusch_dB_Prop, 
    QPSK_Prop,
    User_throughput_UL_CAProp,
    RSSI_dbm_Prop,
    RSSI_PUCCH_dBm_Prop,
    CellThroughputDLMbps_Prop,
    Cell_Throughput_UL_Mbps_Prop,
    Average_DL_UE_LatencyProp,
    DL_RLC_Bler_Rate_Prop,
    UL_RLC_Bler_Rate_Prop,

 }) {
  // Nettoyage final : supprimer tous les useState inutilisés pour les KPI, ne garder que les useState pour les filtres (selectedCity, selectedHour)
  const [selectedCity, setSelectedCity] = useState("");
  const uniqueCities = Array.isArray(cityProp)
    ? [...new Set(cityProp.filter((c) => c !== undefined && c !== null && c !== ""))]
    : [];

  // Gérer le changement de ville sélectionnée
  function handleCityChange(event) {
    setSelectedCity(event.target.value);
  }
  console.log("CityProp", cityProp[0]+"pour la dirienre ville :" + cityProp[cityProp.length - 1]);

  // Dropdown pour filtrer par heure
  const [selectedHour, setSelectedHour] = useState(() => {
    // Par défaut, sélectionner la première heure si disponible
    if (Array.isArray(hoursProp) && hoursProp.length > 0) {
      return hoursProp[0];
    }
    return "";
  });
  // Extraction des heures uniques (en ignorant les doublons)
  const uniqueHours = Array.isArray(hoursProp)
    ? [...new Set((hoursProp.filter((h) => h !== undefined && h !== null && h !== "")))]
    : [];

  // Gérer le changement d'heure sélectionnée
  function handleHourChange(event) {
    setSelectedHour(event.target.value);
  }

  // Nouvelle logique pour afficher l'icône de validation selon la valeur de la colonne "Valeur"
  const isValidKpi = (value) => {
    // On tente de convertir la valeur en nombre
    const num = Number(value);
    return !isNaN(num) && num > 0;
  };

  // Helper to get filtered value for a KPI array
  const getFilteredValue = (arr) => {
    // Toujours afficher la valeur correspondant à l'heure sélectionnée
    if (selectedHour && Array.isArray(hoursProp)) {
      const idx = hoursProp.findIndex(h => h === selectedHour);
      if (idx !== -1 && Array.isArray(arr)) {
        return arr[idx] !== undefined ? arr[idx] : '';
      }
      return '';
    }
    // Si pas d'heure sélectionnée, retourner la première valeur
    if (Array.isArray(arr) && arr.length > 0) {
      return arr[0];
    }
    return '';
  };

  // Helper to get filtered value for city (affiche la ville correspondant à l'heure sélectionnée)
  const getFilteredCity = () => {
    if (selectedHour && Array.isArray(hoursProp) && Array.isArray(cityProp)) {
      const idx = hoursProp.findIndex(h => h === selectedHour);
      if (idx !== -1) {
        return cityProp[idx] !== undefined ? cityProp[idx] : '';
      }
      return '';
    }
    // Sinon, retourner la première ville
    if (Array.isArray(cityProp) && cityProp.length > 0) {
      return cityProp[0];
    }
    return '';
  };

  // Map KPI names to their corresponding arrays
  const kpiMap = {
    '1_RRC Connection Success Rate': _1_RRC_Connection_Success_RateProp,
    '2_ERAB Setup Success Rate': _2_ERAB_Setup_Success_RateProp,
    'S1_Signaling_Setup': S1_Signaling_SetupProp,
    'RRC Connect User': RRC_Connect_UserProp,
    '3_E-RAB Drop Rate(%)': _3_E_RAB_Drop_Rate_Prop,
    '6_User throughput DL (Mbps)': _6_User_throughput_DLProp,
    '7_User throughput UL (Mbps)': _7_User_throughtput_ULProp,
    '4_Intra Frequency HOSR': _4_Intra_Frequency_HOSRProp,
    'Inter Frequency HOSR': Inter_Frequency_HOSRProp,
    '9_LTE Session Continuity': _9_LTE_Session_ContinuityProp,
    '10_Cell Availability': cellAvailabilityProp,
    'pmCellDowntimeAuto': pmCellDowntimeAutoProp,
    'pmCellDowntimeMan': pmCellDowntimeManProp,
    'Traffic Volume UL (Gbytes)': Traffic_Volume_UL__Gbytes_Prop,
    'Traffic Volume DL (Gbytes)': Traffic_Volume_DL__Gbytes_Prop,
    'Active_users': Active_usersProp,
    'pmActiveUeDlSum': pmActiveUeDlSumProp,
    '_CSFB to UMTS': _CSFB_to_UMTSProp,
    '_CSFB to GSM': _CSFB_to_GSMProp,
    'User throughput DL CA': User_throughput_DL_CAProp,
    'CSFB_SR%': CSFB_SR__Prop,
    'PRB_DL_New': PRB_DL_NewProp,
    'PRB_UL_New': PRB_UL_NewProp,
    'CQI': CQIProp,
    'SINR Pusch dB': SINR_Pusch_dB_Prop,
    'QPSK': QPSK_Prop, 
    '16QAM': _16QAM_Prop,
    '64QAM': _64QAM_Prop,
    '256QAM': _256QAM_Prop,
    'User throughput UL CA': User_throughput_UL_CAProp,
    'Spectral Efficiency (bps/Hz)': Spectral_Efficiency__bps_hz___Prop,
    'RSSI (dbm)': RSSI_dbm_Prop,
    'RSSI_PUCCH (dBm)': RSSI_PUCCH_dBm_Prop,
    'DL RLC Bler Rate%': DL_RLC_Bler_Rate_Prop,
    'UL RLC Bler Rate%': UL_RLC_Bler_Rate_Prop,
    'Cell Throughput DL(Mbps)': Cell_Throughput_UL_Mbps_Prop,
    'Cell Throughput UL(Mbps)': CellThroughputDLMbps_Prop,
    'Average DL UE Latency': Average_DL_UE_LatencyProp,

  };

  const columns = [
    { field: "kpi", headerName: "KPI", flex: 1 },
    { field: "Valeur", headerName: "Valeur", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "hours", headerName: "Hours", flex: 1 },
    {
      field: "state",
      headerName: "State",
      flex: 1,
      renderCell: (params) => {
        // On utilise la valeur de la colonne "Valeur" pour la validation
        return isValidKpi(params.row.Valeur) ? (
          <CheckCircleOutlineIcon color="success" />
        ) : (
          <ErrorOutlineIcon color="error" />
        );
      },
    },
  ];

  const rows = Object.keys(kpiMap).map((kpi, idx) => ({
    id: idx + 1,
    kpi,
  }));

  // Enhance rows to show filtered KPI value, city, and hours for each row
  const enhancedRows = rows.map(row => ({
    ...row,
    Valeur: getFilteredValue(kpiMap[row.kpi]),
    city: getFilteredCity(cityProp),
    hours: getFilteredValue(hoursProp), // Add hours value to each row
  }));
 
return (
    <Box sx={{ width: "100%", mt: 4 }}>
      {/* Dropdown pour filtrer par ville */}
      <FormControl sx={{ minWidth: 200, mb: 2, mr: 2 }} size="small">
        <InputLabel id="city-select-label">City</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          value={selectedCity}
          label="City"
          onChange={handleCityChange}
        >
          <MenuItem value="">All</MenuItem>
          {uniqueCities.map((city) => (
            <MenuItem key={city} value={city}>{city}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Dropdown pour filtrer par heure */}
      <FormControl sx={{ minWidth: 200, mb: 2 }} size="small">
        <InputLabel id="hour-select-label">Hour</InputLabel>
        <Select
          labelId="hour-select-label"
          id="hour-select"
          value={selectedHour}
          label="Hour"
          onChange={handleHourChange}
        >
          <MenuItem value="">All</MenuItem>
          {uniqueHours.map((hour) => (
            <MenuItem key={hour} value={hour}>{hour}</MenuItem>
          ))}
        </Select>
      </FormControl>
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
export default KpiDataGrid;