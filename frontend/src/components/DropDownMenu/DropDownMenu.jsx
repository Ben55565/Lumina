import * as React from "react";
import { useState, forwardRef, useImperativeHandle } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const DropDownMenu = forwardRef(({ menuItems }, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useImperativeHandle(ref, () => ({
    openMenu: (event) => {
      setAnchorEl(event.currentTarget);
    },
    closeMenu: () => {
      setAnchorEl(null);
    },
  }));

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      slotProps={{
        list: {
          "aria-labelledby": "basic-button",
        },
      }}
    >
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            handleClose();
            item.onClick?.();
          }}
        >
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
});

export default DropDownMenu;
