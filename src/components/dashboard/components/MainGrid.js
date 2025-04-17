import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import ChartUserByCountry from "./ChartUserByCountry";
import CustomizedTreeView from "./CustomizedTreeView";
import CustomizedDataGrid from "./CustomizedDataGrid";
import HighlightedCard from "./HighlightedCard";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard from "./StatCard";
import ThroughtputLineChart from "./custom/ThroughtputLineChart";
import SessionContinuityBarchart from "./custom/SessionContinuityBarchart";

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
}) {

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
  const [sessionContinuity, setSessionContinuity] = useState(
    sessionContinuityProp
  );

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

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <ThroughtputLineChart
            throughtputDataUlProp={userThroughputUL}
            throughtputDataDlProp={userThroughputDL}
            hoursDataProp={hours}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* <SessionContinuityBarchart /> */}
        </Grid>
      </Grid>

      {/*      
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid> 
      </Grid> */}
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
