import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import IconButton from "@mui/material/IconButton";
import Logout from "./Logout";

export default function OptionsMenu({ onLogout }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logout clicked"); // Debugging log
    onLogout(); // Trigger the logout function
  };
  return (
    <div>
      <IconButton
        aria-label="options"
        aria-controls={open ? "menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertRoundedIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableAutoFocusItem // Prevents focus issues
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout} >
         Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
