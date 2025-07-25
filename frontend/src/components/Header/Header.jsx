import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import Avatar from "@mui/material/Avatar";

import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import DropDownMenu from "../DropDownMenu/DropDownMenu.jsx";
import { stringAvatar } from "../../utils/helperFunctions.js";

export default function Header({
  ShowDrawer,
  setShowDrawer,
  jwt,
  setJwt,
  setAlertInfo,
  homePageDirectory,
  setHomePageDirectory,
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    setAlertInfo({
      show: true,
      type: "success",
      message: t("logout"),
    });
    setTimeout(() => {
      setAlertInfo({ show: false });
      navigate("/login");
      setHomePageDirectory("/about");
      localStorage.removeItem("jwtToken");
      setJwt(null);
    }, 3000);
  };

  const menuItems = [
    { id: 1, label: t("menu.profile") },
    { id: 2, label: t("menu.myAccount") },
    { id: 3, label: t("menu.logout"), onClick: logout },
  ];
  const menuRef = React.useRef();

  const buttonStyle = {
    boxShadow: 2,
    backgroundColor: theme.palette.buttons.background,
    color: theme.palette.buttons.text,
    "&:hover": {
      backgroundColor: theme.palette.buttons.onHover,
    },
  };

  useEffect(() => {
    console.log("JWT Token:", jwt);
    if (jwt) {
      const decoded = jwtDecode(jwt);
      setFullName(decoded.fullName);
    }
  }, [jwt, setFullName]);

  return (
    <AppBar
      position="sticky"
      sx={{
        height: theme.layout.headerHeight,
        flexDirection: "row",
        alignItems: "center",
        boxShadow: `
      0 4px 6px rgba(180, 168, 255, 0.4),
      0 8px 10px -4px rgba(180, 168, 255, 0.5)
    `,
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "1px",
          background: "rgba(180, 168, 255, 0.6)",
        },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 5 }}
          onClick={() => setShowDrawer(!ShowDrawer)}
        >
          <MenuIcon />
        </IconButton>
        <Button
          component={Link}
          to={homePageDirectory}
          disableRipple
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "'Dancing Script', cursive",
              fontWeight: 700,
              fontSize: "1.8rem",
              color: theme.palette.text.appName,
              textShadow: `
      0 0 4px #B8A1FF,
      0 0 6px #FFC1CC
    `,
              letterSpacing: 4,
            }}
          >
            Lumina
          </Typography>
        </Button>
      </Toolbar>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          position: "absolute",
          right: 50,
        }}
      >
        <LanguageSwitcher />
        {!jwt ? (
          <>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={buttonStyle}
            >
              {t("login")}
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={buttonStyle}
            >
              {t("register")}
            </Button>{" "}
          </>
        ) : (
          <>
            <Button onClick={(e) => menuRef.current?.openMenu(e)}>
              <Avatar {...stringAvatar(fullName)} />
            </Button>
            <DropDownMenu ref={menuRef} menuItems={menuItems} />
          </>
        )}
      </Box>
    </AppBar>
  );
}
