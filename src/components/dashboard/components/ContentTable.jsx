import React, { useEffect } from "react";
import KpiDataGrid from "./KpiDataGrid";

function ContentTable({
  rrcConnectionRateProp,
  userDownloadRate,
  userUploadRate,
  erabSuccessRateProp,
  uploadtTrafficProp,
  downloadTrafficProp,
  hourProp,
  cellAvailabilityProp,
  sessionContinuityProp,
  IntraFrequencyHOSRProp,
  LTE_Session_ContinuityProb,
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
  AverageDLUELatency_Prop,
  hoursProp,
  CityProp,
}) {
  // Add useEffect for debugging, similar to ThroughtputLineChart
  useEffect(() => {
    console.log('cellAvailabilityProp:', cellAvailabilityProp);
    // You can log other props as needed
  }, [cellAvailabilityProp]);

  return (
    <KpiDataGrid
      cellAvailabilityProp={cellAvailabilityProp}
      hoursProp={hoursProp}
      rrcConnectionRateProp={rrcConnectionRateProp}
      userDownloadRate={userDownloadRate}
      userUploadRate={userUploadRate}
      erabSuccessRateProp={erabSuccessRateProp}
      uploadtTrafficProp={uploadtTrafficProp}
      downloadTrafficProp={downloadTrafficProp}
      sessionContinuityProp={sessionContinuityProp}
      City={CityProp}
      IntraFrequencyHOSR={IntraFrequencyHOSRProp}
      LTE_Session_ContinuityProb={LTE_Session_ContinuityProb}
      pmCellDowntimeAutoProp={pmCellDowntimeAutoProp}
      pmCellDowntimeManProp={pmCellDowntimeManProp}
      TrafficVolumeUL_GbytesProp={TrafficVolumeUL_GbytesProp}
      TrafficVolumeDL_GbytesProp={TrafficVolumeDL_GbytesProp}
      Active_usersProp={Active_usersProp}
      pmActiveUeDlSumProp={pmActiveUeDlSumProp}
      _CSFBtoUMTSProp={_CSFBtoUMTSProp}
      _CSFBtoGSMProp={_CSFBtoGSMProp}
      UserthroughputDLCAProp={UserthroughputDLCAProp}
      CSFB_SR__Prop={CSFB_SR__Prop}
      PRB_UL_NewProp={PRB_UL_NewProp}
      CQIProp={CQIProp}
      PRB_DL_NewProp={PRB_DL_NewProp}
      SINR_PuschdBProp={SINR_PuschdBProp}
      QPSK__Prop={QPSK__Prop}
      _16QAM__Prop={_16QAM__Prop}
      _64QAM__Prop={_64QAM__Prop}
      _256QAM__Prop={_256QAM__Prop}
      SpectralEfficiencybpshz__Prop={SpectralEfficiencybpshz__Prop}
      UserthroughputULCAProp={UserthroughputULCAProp}
      RSSI_dbmProp={RSSI_dbmProp}
      RSSI_PUCCHdBmProp={RSSI_PUCCHdBmProp}
      DLRLCBlerRate_Prop={DLRLCBlerRate_Prop}
      ULRLCBlerRate_Prop={ULRLCBlerRate_Prop}
      CellThroughputDLMbps_Prop={CellThroughputDLMbps_Prop}
      CellThroughputULMps_Prop={CellThroughputULMps_Prop}
      //AverageDLUELatency_Prop={AverageDLUELatency_Prop}
    />
  );
}

export default ContentTable;