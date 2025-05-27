import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import BaseAccountForm from "../../components/BaseAccountForm/BaseAccountForm.jsx";
import OTPInput from "../../components/OTPInput/OTPInput.jsx";
import OtpTimer from "../../components/OtpTimer/OtpTimer.jsx";

import api from "../../api/api.js";

export default function RegisterPage({ setAlertInfo }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
    firstName: "",
    lastName: "",
    anonymity: false,
    birthdate: dayjs().subtract(8, "year"),
    phoneNum: "",
    displayName: "",
  });

  const theme = useTheme();
  const [step, setStep] = useState(0);

  const [formErrors, setFormErrors] = useState({
    email: { error: false, helperText: "" },
    password: {
      length: false,
      lowercase: false,
      uppercase: false,
      digit: false,
    },
    confirmPassword: { error: false, helperText: "" },
    firstName: { error: false, helperText: "" },
    lastName: { error: false, helperText: "" },
    displayName: {
      error: false,
      helperText:
        "Note: Display name is a must, it will be used to identify you in the platform if you choose to remain anonymous. Cannot contain special characters.",
    },
  });

  const [resetCount, setResetCount] = useState(0);

  const sendVerificationEmail = async () => {
    try {
      const res = await api.post("/email-verification", {
        email: formData.email,
      });
      setStep(1);
      setResetCount((count) => count + 1);
      setAlertInfo({
        show: true,
        type: res.data.result,
        message: res.data.info,
      });
      setTimeout(() => {
        setAlertInfo({ show: false });
      }, 3000);
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
    }
  };

  const checkOTPInput = async () => {
    try {
      const res = await api.post("/otp-verification", {
        email: formData.email,
        code: formData.code,
      });

      setAlertInfo({
        show: true,
        type: res.data.result,
        message: res.data.info,
      });
      setTimeout(() => {
        setAlertInfo({ show: false });
        if (res.data.result === "success") {
          setStep(2);
        }
      }, 3000);
    } catch (err) {
      console.error(
        "OTP verification failed:",
        err.response?.data || err.message
      );
    }
  };

  const saveUser = async () => {
    try {
      const res = await api.post("/complete-profile", {
        email: formData.email,
        password: formData.password,
        name: formData.firstName.trim() + " " + formData.lastName.trim(),
        displayName: formData.displayName,
        birthDate: formData.birthDate,
        phoneNum: formData.phoneNum,
        anonymity: formData.anonymity,
      });
      setAlertInfo({
        show: true,
        type: res.data.result,
        message: res.data.info,
      });
      setTimeout(() => {
        setAlertInfo({ show: false });
      }, 3000);
    } catch (err) {
      const errorData = err.response?.data;

      const newErrors = {
        ...formErrors,
        ...errorData.errors,
      };

      if (!newErrors.password) {
        newErrors.password = {
          length: false,
          lowercase: false,
          uppercase: false,
          digit: false,
        };
      }

      setFormErrors(newErrors);

      const info = errorData.info;
      const errorMessages =
        typeof info === "object"
          ? Object.values(info).join("\n")
          : info || "Some fields already exist. Please check.";

      setAlertInfo({
        show: true,
        type: "warning",
        message: errorMessages,
      });

      setTimeout(() => {
        setAlertInfo({ show: false });
      }, 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 0) {
      if (validate(formData)) {
        sendVerificationEmail();
      }
    } else if (step === 1) {
      checkOTPInput();
    } else {
      saveUser();
    }
  };

  const handleChange = (field) => (e) => {
    const newValue = e.target.value;
    const newFormData = { ...formData, [field]: newValue };
    setFormData(newFormData);
    if ((step === 0 || step === 2) && e.target.value) {
      validate(newFormData);
    } else {
      if (field === "password") {
        setFormErrors({
          ...formErrors,
          [field]: {
            length: false,
            lowercase: false,
            uppercase: false,
            digit: false,
          },
        });
      } else {
        setFormErrors({
          ...formErrors,
          [field]: { error: false, helperText: "" },
        });
      }
    }
  };

  const validate = (data) => {
    const errors = {
      email: { error: false, helperText: "" },
      password: {
        length: false,
        lowercase: false,
        uppercase: false,
        digit: false,
      },
      confirmPassword: { error: false, helperText: "" },
      firstName: { error: false, helperText: "" },
      lastName: { error: false, helperText: "" },
      displayName: { error: false, helperText: "" },
    };
    let hasError = false;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) && data.email) {
      errors.email = {
        error: true,
        helperText: "Invalid email address",
      };
      hasError = true;
    }
    if (data.password) {
      errors.password = {
        length: data.password.length >= 6,
        lowercase: /[a-z]/.test(data.password),
        uppercase: /[A-Z]/.test(data.password),
        digit: /\d/.test(data.password),
      };
      const failed = Object.values(errors.password).some(
        (val) => val === false
      );
      if (failed) hasError = true;
    }
    if (step === 2) {
      if (!data.firstName.trim() || data.firstName.length < 2) {
        errors.firstName = {
          error: true,
          helperText:
            "First name is required and must be at least 2 characters long",
        };
        hasError = true;
      }

      if (!data.lastName.trim() || data.lastName.length < 2) {
        errors.lastName = {
          error: true,
          helperText:
            "Last name is required and must be at least 2 characters long",
        };
        hasError = true;
      }

      if (!data.displayName.trim() || data.displayName.length < 2) {
        errors.displayName = {
          error: true,
          helperText:
            "Display name is required and must be at least 2 characters long",
        };
        hasError = true;
      } else if (/[^a-zA-Z0-9\s]/.test(data.displayName)) {
        errors.displayName = {
          error: true,
          helperText: "Display name cannot contain special characters",
        };
        hasError = true;
      }
    }

    if (
      data.password !== data.confirmPassword &&
      data.password &&
      data.confirmPassword
    ) {
      errors.confirmPassword = {
        error: true,
        helperText: "Passwords do not match",
      };
      hasError = true;
    }

    setFormErrors(errors);
    return !hasError;
  };

  const rules = [
    { key: "length", label: "6 characters" },
    { key: "lowercase", label: "One lowercase character" },
    { key: "uppercase", label: "One uppercase character" },
    { key: "digit", label: "One digit" },
  ];

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");

    if (!digits.startsWith("05")) return "05";

    const limitedDigits = digits.slice(0, 10);

    if (limitedDigits.length > 3) {
      return `${limitedDigits.slice(0, 3)}-${limitedDigits.slice(3)}`;
    }

    return limitedDigits;
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value;
    const formatted = formatPhoneNumber(rawValue);
    setFormData({ ...formData, phoneNum: formatted });
  };

  const passwordRestrictions = (
    <>
      <Typography fontWeight="bold" component="p" sx={{ mt: 1, fontSize: 14 }}>
        Password must contain at least:
      </Typography>
      <Box component="ul" sx={{ pl: 2, m: 0 }}>
        {rules.map((rule) => (
          <Typography
            key={rule.key}
            component="li"
            sx={{
              fontSize: 13,
              color: !formErrors.password[rule.key]
                ? theme.palette.error.main
                : "text.secondary",
            }}
          >
            {rule.label}
          </Typography>
        ))}
      </Box>
    </>
  );

  const otpForm = (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={10}
      p={4}
    >
      <Typography variant="h5" mb={2}>
        Please enter the verification code sent to your email address
      </Typography>

      <OtpTimer reset={resetCount} />

      <Box mt={2}>
        <OTPInput
          value={formData.code}
          onChange={(code) => setFormData({ ...formData, code })}
        />
      </Box>

      <Button variant="contained" type="submit" sx={{ mt: 5 }}>
        Verify
      </Button>

      <Typography
        onClick={() => {
          if (formData.email) sendVerificationEmail();
        }}
        sx={{ cursor: "pointer", color: "primary.main", mt: 2 }}
        tabIndex={0}
        role="button"
      >
        Click me to resend code
      </Typography>
    </Box>
  );

  const completeFormData = (
    <Paper elevation={3} sx={{ p: 4, width: 600, mx: "auto", mt: 10 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
      >
        <Box display="flex" gap={2} width="100%">
          <TextField
            label="First Name"
            fullWidth
            value={formData.firstName}
            onChange={handleChange("firstName")}
            error={formErrors.firstName.error}
            helperText={formErrors.firstName.helperText}
            required
          />
          <TextField
            label="Last Name"
            fullWidth
            value={formData.lastName}
            onChange={handleChange("lastName")}
            error={formErrors.lastName.error}
            helperText={formErrors.lastName.helperText}
            required
          />
        </Box>

        <Box display="flex" alignItems="center" width="100%" sx={{ ml: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isAnonymous}
                onChange={(e) =>
                  setFormData({ ...formData, isAnonymous: e.target.checked })
                }
              />
            }
            label="Appear Hidden"
          />
          <Tooltip title="Your real name won't be shown in public areas of the platform.">
            <InfoOutlinedIcon color="action" />
          </Tooltip>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birth Date"
            value={formData.birthDate || dayjs().subtract(8, "year")}
            onChange={(newValue) =>
              setFormData({ ...formData, birthDate: newValue })
            }
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
              },
            }}
            defaultValue={dayjs().subtract(8, "year")}
            maxDate={dayjs().subtract(8, "year")}
            required
          />
        </LocalizationProvider>

        <TextField
          label="Phone Number"
          placeholder="05X-XXXXXXX"
          fullWidth
          value={formData.phoneNum}
          onChange={handlePhoneChange}
          helperText="Note: Phone number is optional. Should be in the format 05X-XXXXXXX."
          inputProps={{
            inputMode: "tel",
            maxLength: 11,
          }}
        />

        <TextField
          label="Display Name"
          fullWidth
          value={formData.displayName}
          onChange={handleChange("displayName")}
          error={formErrors.displayName.error}
          helperText={formErrors.displayName.helperText}
          required
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 2, width: 200, height: 50 }}
        >
          Finish Registration
        </Button>
      </Box>
    </Paper>
  );

  const isPasswordInvalid =
    !!formData.password &&
    (!formErrors.password?.length ||
      !formErrors.password?.lowercase ||
      !formErrors.password?.uppercase ||
      !formErrors.password?.digit);

  return (
    <>
      {step === 0 && (
        <BaseAccountForm
          title="Create your account"
          formData={formData}
          formErrors={formErrors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitText="Register"
          isPasswordInvalid={() => isPasswordInvalid}
          showConfirmPassword={true}
        >
          {passwordRestrictions}
        </BaseAccountForm>
      )}

      {step === 1 && otpForm}

      {step === 2 && (
        <Box display="flex" justifyContent="center">
          {completeFormData}
        </Box>
      )}
    </>
  );
}
