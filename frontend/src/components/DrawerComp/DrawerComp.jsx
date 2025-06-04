import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import FeedIcon from "@mui/icons-material/Feed";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import lantern from "../../assets/lantern.gif";

export default function DrawerComp({ ShowDrawer, mode, setMode, toggleTheme }) {
  const theme = useTheme();

  const { t } = useTranslation();

  const menuItems = [
    { text: t("about"), icon: <InfoIcon />, link: "/about" },
    { text: t("feed"), icon: <FeedIcon />, link: "/feed" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={true}
      sx={{
        width: 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: theme.layout.drawerWidth,
          position: "fixed",
          top: 0,
          left: 0,
          borderRight: "none",
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: 2,
          zIndex: 2,
          height: `calc(100vh - ${theme.layout.footerHeight}px)`,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.secondary,
          transition: "transform 0.3s ease",
          transform: ShowDrawer
            ? "translateX(0)"
            : `translateX(-${theme.layout.drawerWidth}px)`,
          px: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box
        component="img"
        src={lantern}
        alt="Lantern"
        sx={{
          width: 85,
          height: 100,
          borderRadius: 1,
          mb: 5,
          mx: "auto",
        }}
      />
      <Divider sx={{ width: "100%" }} />
      <Box
        sx={{
          overflowY: "auto",
          flexGrow: 1,
          mt: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <List disablePadding sx={{ width: "100%" }}>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                width: "100%",
              }}
            >
              <ListItemButton
                sx={{
                  color: theme.palette.text.primary,
                  width: "100%",
                  px: 1.5,
                  justifyContent: "center",
                  textAlign: "center",
                }}
                component={Link}
                to={item.link}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                  sx={{ m: 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          pt: 1,
          width: "100%",
          backgroundColor: "background.paper",
        }}
      >
        <Button
          onClick={toggleTheme}
          sx={{
            width: "100%",
            borderRadius: 0,
            justifyContent: "center",
            px: 2,
          }}
          startIcon={mode === "light" ? <Brightness4 /> : <Brightness7 />}
        >
          <Typography>{t(mode + "Mode")}</Typography>
        </Button>
      </Box>
    </Drawer>
  );
}
