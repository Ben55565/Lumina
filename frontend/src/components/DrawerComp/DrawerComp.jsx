import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

export default function DrawerComp({ ShowDrawer, setShowDrawer }) {
  const theme = useTheme();

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, link: "/home" },
    { text: "Feed", icon: <FeedIcon />, link: "/feed" },
  ];

  return (
    <Drawer
      variant="persistent"
      open={ShowDrawer}
      anchor="left"
      sx={{
        width: ShowDrawer ? theme.layout.drawerWidth : 0,
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: "width 0.3s",
        overflowX: "hidden",
        zIndex: 10000,

        "& .MuiDrawer-paper": {
          width: ShowDrawer ? theme.layout.drawerWidth : 0,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.secondary,
          transition: "transform 0.3s ease",
          overflowX: "hidden",
        },
      }}
    >
      <Box
        sx={{
          overflow: "auto",
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                width: "100%",
              }}
            >
              <ListItemButton
                sx={{ color: theme.palette.text.primary }}
                component={Link}
                to={item.link}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
