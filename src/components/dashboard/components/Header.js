import * as React from "react";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CustomDatePicker from "./custom/CustomDatePicker";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import MenuButton from "./MenuButton";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import Search from "./Search";
import CitySelect from "./custom/CitySelectComponent";
import useCity from "../../../hooks/useCity";
import useSheet from "../../../hooks/useSheet";
import SheetSelect from "./custom/SheetSelect";
import useDate from "../../../hooks/useDate";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
