import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function BaseAccountForm({
  title,
  formData,
  formErrors,
  onChange = () => () => {},
  onSubmit,
  submitText = "Submit",
  isPasswordInvalid = () =>
    formData.password &&
    formData.password.length > 0 &&
    formData.password.length < 6,
  showConfirmPassword = false,
  confirmPasswordProps = {},
  children,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const [showConfirm, setShowConfirm] = useState(false);
  const handleToggleConfirm = () => setShowConfirm((prev) => !prev);

  const { t } = useTranslation();

  return (
    <Box display="flex" justifyContent="center" mt={10}>
      <Paper elevation={3} sx={{ p: 4, width: 500 }}>
        <Typography variant="h5" mb={2} align="center">
          {title}
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            label={t("email")}
            margin="normal"
            type="email"
            value={formData.email}
            onChange={onChange("email")}
            error={formErrors.email?.error}
            helperText={formErrors.email?.helperText}
            required
          />

          <TextField
            fullWidth
            label={t("password")}
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={onChange("password")}
            error={isPasswordInvalid()}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {children}

          {showConfirmPassword && (
            <TextField
              fullWidth
              label={t("confirmPassword")}
              margin="normal"
              type={showConfirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={onChange("confirmPassword")}
              error={formErrors.confirmPassword?.error}
              helperText={formErrors.confirmPassword?.helperText}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirm} edge="end">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...confirmPasswordProps}
            />
          )}

          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ width: 100 }}
            >
              {submitText}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
