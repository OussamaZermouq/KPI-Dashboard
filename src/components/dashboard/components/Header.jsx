import * as React from "react";
import Stack from "@mui/material/Stack";
import CustomDatePicker from "./custom/CustomDatePicker";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import CitySelect from "./custom/CitySelectComponent";
import useCity from "../../../hooks/useCity";
import useSheet from "../../../hooks/useSheet";
import SheetSelect from "./custom/SheetSelect";
import useDate from "../../../hooks/useDate";

export default function Header() {
  const { selectedCity, cities } = useCity();
  const { sheets } = useSheet();
  const { dates } = useDate();
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        {selectedCity && cities && <CitySelect />}
        {sheets && sheets.length > 0 && <SheetSelect />}
        {dates && dates.length > 0 && <CustomDatePicker />}
        <ColorModeIconDropdown />
        
      </Stack>
    </Stack>
  );
}
