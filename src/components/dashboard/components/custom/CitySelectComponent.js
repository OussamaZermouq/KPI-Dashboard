import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CityContext } from "../../../../App";

export default function CitySelect() {
  const { cities, setCities, selectedCity, setSelectedCity } = React.useContext(CityContext);
  
  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };

  React.useEffect(()=>{
    console.log("SELECTED CITY FROM CONTEXT : "+{selectedCity})
  },[])
  return (
    <FormControl sx={{ height: 10, minWidth: 120 }} size="small">
      <InputLabel id="city-select-label">City</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-select"
        value={selectedCity}
        onChange={handleChange}
        autoWidth
        label="City"
      >
        {cities & cities.length >0 && (
          cities.map((city)=>{
            <MenuItem value={city}>{city}</MenuItem>
          })
        )}
      </Select>
    </FormControl>
  );
}
