import React, { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function OtpTimer({ reset }) {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes in seconds
  const timerId = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    setSecondsLeft(300); // reset to 5 minutes on reset prop change
  }, [reset]);

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timerId.current);
      return;
    }

    timerId.current = setInterval(() => {
      setSecondsLeft((sec) => sec - 1);
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [secondsLeft]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return minutes > 0 || seconds > 0 ? (
    <Typography variant="h5" sx={{ mb: 2, fontSize: 16 }}>
      {t("timerText")} {minutes}:{seconds}.
    </Typography>
  ) : (
    <Typography variant="h5" sx={{ mb: 2, fontSize: 16 }}>
      {t("timerExpired")}
    </Typography>
  );
}

export default OtpTimer;
