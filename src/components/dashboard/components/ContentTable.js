import React, { useEffect, useState, useCallback } from "react";
import KpiDataGrid from "./KpiDataGrid";
import { getKPI } from "../../../service/kpiService";

export default function ContentTable({ sheetName, file }) {
  const [kpiData, setKpiData] = useState({
    cellAvailability: [],
    hours: [],
    rrcConnectionRate: [],
    userDownloadRate: [],
    userUploadRate: [],
    erabSuccessRate: [],
    uploadTraffic: [],
    downloadTraffic: [],
    sessionContinuity: [],
    City: [],
    IntraFrequencyHOSR: [],
  });

  const fetchKpiData = useCallback(async () => {
    const data = await getKPI(sheetName, file);
    console.log('Raw KPI data:', data); // Log the raw data returned from getKPI
    if (data && data.data) {
      setKpiData({
        cellAvailability: data.data.map((kpi) => kpi["10_Cell Availability"]),
        hours: data.data.map((kpi) => kpi["Hour"]),
        rrcConnectionRate: data.data.map((kpi) => kpi["1_RRC Connection Success Rate"]),
        userDownloadRate: data.data.map((kpi) => kpi["6_User throughput DL"]),
        userUploadRate: data.data.map((kpi) => kpi["7_User throughtput UL"]),
        erabSuccessRate: data.data.map((kpi) => kpi["2_ERAB Setup Success Rate"]),
        uploadTraffic: data.data.map((kpi) => kpi["Traffic Volume UL (Gbytes)"]),
        downloadTraffic: data.data.map((kpi) => kpi["Traffic Volume DL (Gbytes)"]),
        sessionContinuity: data.data.map((kpi) => kpi["9_LTE Session Continuity"]),
        City: data.data.map((kpi) => kpi["City"]),
        IntraFrequencyHOSR: data.data.map((kpi) => kpi["4_Intra Frequency HOSR"]),
      });
    }
  }, [sheetName, file]);

  useEffect(() => {
    if (sheetName && file) {
      fetchKpiData();
    }
  }, [sheetName, file, fetchKpiData]);
  console.log("file name is "+file, +"  sheet name is : "+ sheetName);

  useEffect(() => {
    console.log('cellAvailability_test good:', kpiData.cellAvailability);
  }, [kpiData]);

  return (
    <KpiDataGrid
      cellAvailabilityProp={kpiData.cellAvailability || []}
      hoursProp={kpiData.hours || []}
      rrcConnectionRateProp={kpiData.rrcConnectionRate || []}
      userDownloadRate={kpiData.userDownloadRate || []}
      userUploadRate={kpiData.userUploadRate || []}
      erabSuccessRateProp={kpiData.erabSuccessRate || []}
      uploadtTrafficProp={kpiData.uploadTraffic || []}
      downloadTrafficProp={kpiData.downloadTraffic || []}
      sessionContinuityProp={kpiData.sessionContinuity ||[]}
      City={kpiData.City || []}
      IntraFrequencyHOSR={kpiData.IntraFrequencyHOSR || []}
    />
  );
}