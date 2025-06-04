import { useLoading } from "../../context/LoadingContext";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

export default function GlobalLoader() {
  const { loading } = useLoading();

  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      })}
      open={loading}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Loading...
      </Typography>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
