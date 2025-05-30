import React from "react";
import { Alert, AlertTitle, Box } from "@mui/material";

const Alerts = ({ alertInfo }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "20px",
        zIndex: 2,
      }}
    >
      {alertInfo.show && (
        <Alert
          severity={alertInfo.type}
          sx={{
            fontWeight: "bold",
            fontSize: 16,
            width: 400,
            borderRadius: 10,
            boxShadow: 1,
            whiteSpace: "pre-line",
          }}
        >
          <AlertTitle sx={{ fontWeight: "bold", fontSize: 18 }}>
            {alertInfo.type.charAt(0).toUpperCase() + alertInfo.type.slice(1)}
          </AlertTitle>
          {alertInfo.message}
        </Alert>
      )}
    </Box>
  );
};

export default Alerts;
