import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { useNavigate, useLocation } from "react-router-dom";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
export default function MenuContent({ userRole }) {
  const [isAdmin, setIsAdmin] = React.useState(userRole === "ADMIN");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleListItemClick = (event, index, link) => {
    setSelectedIndex(index);
    navigate(link);
  };
  const mainListItems = [
    { text: "Dashboard", icon: <AnalyticsRoundedIcon />, slug: "/dashboard" },
    {text:"Custom chart", icon: <AutoAwesomeIcon />, slug:"/custom"},
    ...(userRole === "ADMIN"
      ? [
          {
            text: "Utilisateurs",
            icon: <PeopleRoundedIcon />,
            slug: "/users",
          },
        ]
      : []),
  ];

  const secondaryListItems = [
    { text: "Settings", icon: <SettingsRoundedIcon /> },
    { text: "About", icon: <InfoRoundedIcon /> },
    { text: "Feedback", icon: <HelpRoundedIcon /> },
  ];

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item) => (
          <ListItem key={item.slug} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={currentPath === item.slug}
              onClick={() => navigate(item.slug)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
