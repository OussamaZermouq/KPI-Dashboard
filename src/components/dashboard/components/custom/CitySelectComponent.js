import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import useCity from "../../../../hooks/useCity";

export default function CitySelect() {
  const { cities, setCities, selectedCity, setSelectedCity } = useCity()

  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <FormControl sx={{ height:'100%', minWidth: 120 }} size="large">
      <InputLabel id="city-select-label">City</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-select"
        value={selectedCity}
        onChange={handleChange}
        autoWidth
        label="City"
      >
        {cities && (
          cities.map((city)=>{
            return <MenuItem value={city}>{city}</MenuItem>
          })
        )}
      </Select>
    </FormControl>
  );
}
