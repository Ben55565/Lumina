import React, { useRef } from "react";
import { Box, TextField } from "@mui/material";

export default function CodeInput({ value, onChange }) {
  const inputsRef = useRef([]);

  const handleInputChange = (index) => (e) => {
    const val = e.target.value;

    if (!/^[0-9]?$/.test(val)) return;

    const newValue = value.split("");
    newValue[index] = val;
    onChange(newValue.join(""));

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index) => (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newValue = value.split("");

      if (value[index]) {
        newValue[index] = "";
        onChange(newValue.join(""));
      } else if (index > 0) {
        newValue[index - 1] = "";
        onChange(newValue.join(""));
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^[0-9]+$/.test(paste)) return;

    const newValue = value.split("");
    for (let i = 0; i < 6; i++) {
      newValue[i] = paste[i] || "";
    }
    onChange(newValue.join(""));

    const lastFilledIndex = paste.length >= 6 ? 5 : paste.length;
    inputsRef.current[lastFilledIndex]?.focus();
  };

  return (
    <Box display="flex" gap={1} justifyContent="center">
      {[...Array(6)].map((_, i) => (
        <TextField
          key={i}
          inputRef={(el) => (inputsRef.current[i] = el)}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: "24px",
              padding: "10px",
              width: "40px",
            },
            inputMode: "numeric",
          }}
          value={value[i] || ""}
          onChange={handleInputChange(i)}
          onKeyDown={handleKeyDown(i)}
          onPaste={handlePaste}
        />
      ))}
    </Box>
  );
}
