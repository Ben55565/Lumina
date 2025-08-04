import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTranslation } from "react-i18next";

export default function RestrictedAccess({ title, message }) {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        textAlign: "center",
        maxWidth: 500,
        margin: "auto",
        mt: 8,
        borderRadius: 4,
        backgroundColor: "background.paper",
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <LockOutlinedIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" gutterBottom color="text.primary">
          {t(title)}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t(message)}
        </Typography>
      </Box>
    </Paper>
  );
}
