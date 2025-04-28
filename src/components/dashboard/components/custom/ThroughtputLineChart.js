import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";

function ThroughtputLineChart({
  throughtputDataUlProp,
  hoursDataProp,
  throughtputDataDlProp,
}) {
  const [throughtputDataUl, setThroughtputDataUl] = useState(
    throughtputDataUlProp
  );
  const [throughtputDataDl, setThroughtputDataDl] = useState(
    throughtputDataDlProp
  );
  const [hoursData, setHoursData] = useState(hoursDataProp);

  return (
    <LineChart
      sx={{
        width: "100%",
      }}
      height={300}
      localeText={{
        loading: "Data should be available soon.",
        noData: "Select some data to display.",
      }}
      series={[
        { data: throughtputDataUl, label: "Upload Throughput" },
        { data: throughtputDataDl, label: "Download Throughput" },
      ]}
      xAxis={[
        {
          scaleType: "point",
          data: hoursData,
          //colorMap: { colors: ["purple"], type: "piecewise", },
      }
      ]}
    />
  );
}

export default ThroughtputLineChart;
