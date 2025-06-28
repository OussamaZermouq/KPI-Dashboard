import * as React from "react";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AnalyticsIcon from "@mui/icons-material/Analytics";

export default function ChartDataPicker({ dataProp, setSelectedCityProp, setSelectedSheetProp }) {
  React.useEffect(() => {
    console.log(dataProp.cities);
  }, []);
  const [selectedCity, setSelectedCity] = React.useState('');
  const [selectedSheet, setSelectedSheet] = React.useState('');

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedCityProp(e.target.value)
  };

  const handeSheetName = (e) => {
    setSelectedSheet(e.target.value);
    setSelectedSheetProp(e.target.value);
  };
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
      <Stack gap={5}>
        <Box>
          <Typography variant="h5">Configure your chart</Typography>

          <Typography variant="caption">
            Select the data for your chart
          </Typography>
        </Box>

        <Grid
          sx={{
            justifyContent: "center",
          }}
          container
          columns={2}
          spacing={20}
        >
          <Grid>
            <Stack gap={2}>
              <Typography variant="h7">
                <LocationOnIcon /> Location
              </Typography>

              <FormControl fullWidth>
                <InputLabel id="city-select-label">City</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-select"
                  value={selectedCity}
                  label="City"
                  onChange={(e) => handleCityChange(e)}
                >
                  {dataProp.cities.map((city) => {
                    return <MenuItem value={city}>{city}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          <Divider flexItem orientation="vertical" />
          <Grid>
            <Stack gap={2}>
              <Typography variant="h7">
                <AnalyticsIcon /> Sheet
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="select-sheet-label">Sheet</InputLabel>
                <Select
                  labelId="select-sheet-label"
                  id="select-sheet"
                  value={selectedSheet}
                  label="Sheet"
                  onChange={(e) => handeSheetName(e)}
                >
                  {dataProp.sheets.map((sheet) => {
                    return <MenuItem value={sheet}>{sheet}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
        <Box>
          <Typography variant="caption">Select the chart type</Typography>
        </Box>
        
      </Stack>
    </Paper>
  );
}
