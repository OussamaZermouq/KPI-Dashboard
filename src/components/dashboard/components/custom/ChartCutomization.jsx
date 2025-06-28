import * as React from "react";
import { getKPI } from "../../../../service/kpiService";
import {
  Box,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ChartCustomization({
  sheetNameProp,
  cityProp,
  chartTypeProp,
  fileProp,
}) {
  const [sheetData, setSheetData] = React.useState([]);
  const [xAxischartData, setXAxisChartData] = React.useState([1, 2, 3, 4]);
  const [yAxischartData, setyAxisChartData] = React.useState([1, 2, 3, 4]);
  const [yAxisLabel, setYAxisLabel] = React.useState("");
  const [xAxisLabel, setXAxisLabel] = React.useState("");
  const [xAxisDataKey, setXAxisDataKey] = React.useState("");
  const [chartTitle, setChartTitle] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getKPI(sheetNameProp, cityProp, fileProp);
      setSheetData(data["data"]);
    };
    fetchData();
  }, [sheetNameProp, cityProp, fileProp]);

  const chartSetting = {
    xAxis: [{ dataKey: "Hour", label: xAxisLabel }],
    series: [
      {
        type: "band",
        dataKey: "1_RRC Connection Success Rate",
        label: "RRC Connection rate",
      },
    ],
    height: 300,
    dataset: sheetData,
  };

  React.useEffect(() => {
    console.log(sheetData[0]);
  }, [sheetData]);
  function DataGridKeysItem({ item }) {
    console.log(item)
    return (
      <Box borderRadius={0}>
        <Typography variant="h4">{item}</Typography>
      </Box>
    )
  }
  return (
    <Paper
      elevation={2}
      sx={{
        width: "90%",
        height: "100%",
        borderRadius: 5,
        p: 5,
        display: "flex flex-row",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      {sheetData && <BarChart {...chartSetting} />}
      <Divider flexItem orientation="horizontal" />

      <Stack>
        <Typography variant="h5">Labels</Typography>
        <Stack direction={"row"} gap={2}>
          <TextField
            id="x-label"
            label="X Axis"
            variant="outlined"
            onChange={(e) => setXAxisLabel(e.target.value)}
          />
          <TextField
            id="y-label"
            label="Y Axis"
            variant="outlined"
            onChange={(e) => setYAxisLabel(e.target.value)}
          />
        </Stack>

        <Stack>
          <Typography variant="h5">Data</Typography>
          {/* {sheetData && (
            <Carousel animation="slide">
              {Object.keys(sheetData[0]).map((key) => {
                return <DataGridKeysItem item={key} />;
              })}
            </Carousel>
          )} */}
          {/* TODO: Find a better carousel component or look for a better idea */}
        </Stack>
      </Stack>

      <Grid container columns={3} gap={50}>
        <Grid></Grid>
      </Grid>
    </Paper>
  );
}
