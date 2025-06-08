import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import useSheet from "../../../../hooks/useSheet";

export default function SheetSelect() {
  const { sheets, setSheets, selectedSheet, setSelectedSheet } = useSheet();

  const handleChange = (e) => {
    setSelectedSheet(e.target.value);
  };
  return (
    <FormControl sx={{ height: 10, minWidth: 120 }} size="small">
      <InputLabel id="sheet-select-label">Sheet</InputLabel>
      <Select
        labelId="sheet-select-label"
        id="sheet-select"
        value={selectedSheet}
        onChange={handleChange}
        autoWidth
        label="sheet"
      >
        {sheets &&
          sheets.map((sheet) => {
            return <MenuItem value={sheet}>{sheet}</MenuItem>;
          })}
      </Select>
    </FormControl>
  );
}
