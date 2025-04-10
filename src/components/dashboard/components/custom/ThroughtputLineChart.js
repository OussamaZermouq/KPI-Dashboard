import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";

function ThroughtputLineChart({ throughtputDataUlProp, hoursDataProp,throughtputDataDlProp  }) {
  const [throughtputDataUl, setThroughtputDataUl] = useState(throughtputDataUlProp);
  const [throughtputDataDl, setThroughtputDataDl] = useState(throughtputDataDlProp);
  const [hoursData, setHoursData] = useState(hoursDataProp)

  useEffect(()=>{
    console.log("TEST")
    console.log(throughtputDataUl)
  }, [throughtputDataUl])


  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];
  return (
    <LineChart
      sx={{
        width: "100%",
      }}
      height={300}
      series={[
        { data: throughtputDataUl, label: "Upload Throughput" },
        { data: throughtputDataDl, label: "Download Throughput" },
      ]}
      xAxis={[{ scaleType: "point", data: hoursData }]}
    />
  );
}

export default ThroughtputLineChart;
