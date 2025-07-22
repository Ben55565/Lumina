import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "center",
        padding: "5px",
        height: theme.layout.footerHeight,
        backgroundColor: theme.palette.background.paper,
        zIndex: 2,
        boxShadow: 5,
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography
          level="title-lg"
          color="text.secondary"
          sx={{
            mb: 1,
            fontSize: "1.2rem",
            fontFamily: "Monospace",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          {t("footer.title")}
        </Typography>
        <Typography
          level="title-sm"
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontSize: "1rem" }}
        >
          {t("footer.name")} @ {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}
