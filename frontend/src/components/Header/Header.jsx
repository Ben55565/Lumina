import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function Header({
  ShowDrawer,
  setShowDrawer,
  mode,
  setMode,
  toggleTheme,
}) {
  const theme = useTheme();

  const buttonStyle = {
    boxShadow: 2,
    backgroundColor: theme.palette.buttons.background,
    color: theme.palette.buttons.text,
    "&:hover": {
      backgroundColor: theme.palette.buttons.onHover,
    },
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        height: theme.layout.headerHeight,
        flexDirection: "row",
        alignItems: "center",
        boxShadow: 5,
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
        <Button component={Link} to="/home">
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
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={buttonStyle}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          sx={buttonStyle}
        >
          Register
        </Button>
      </Box>
    </AppBar>
  );
}
