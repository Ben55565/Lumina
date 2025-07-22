import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import BaseAccountForm from "../../components/BaseAccountForm/BaseAccountForm.jsx";
import OTPInput from "../../components/OTPInput/OTPInput.jsx";
import OtpTimer from "../../components/OtpTimer/OtpTimer.jsx";
import {
  validateEmail,
  validatePassword,
  validateMatchingPasswords,
  validateName,
  validateDisplayName,
  validateBirthDate,
} from "../../utils/validations.js";
import { useTranslation } from "react-i18next";

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

  const [step, setStep] = useState(0);

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

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
      helperText: t("displayNameHelperText"),
    },
    birthDate: { error: false, helperText: "" },
  });

  const [resetCount, setResetCount] = useState(0);

  const sendVerificationEmail = async () => {
    try {
      const res = await api.get("/email-verification", {
        params: { email: formData.email },
        headers: {
          "Accept-Language": i18n.language,
        },
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
      setAlertInfo({
        show: true,
        type: err.response.data.result,
        message: err.response.data.info,
      });
      setTimeout(() => {
        setAlertInfo({ show: false });
      }, 3000);
    }
  };

  const checkOTPInput = async () => {
    try {
      const res = await api.get("/otp-verification", {
        params: { email: formData.email, inputCode: formData.code },
        headers: {
          "Accept-Language": i18n.language,
        },
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
      setAlertInfo({
        show: true,
        type: err.response.data.result,
        message: err.response.data.info,
      });
      setTimeout(() => {
        setAlertInfo({ show: false });
      }, 3000);
    }
  };

  const saveUser = async () => {
    try {
      const res = await api.post(
        "/complete-profile",
        {
          email: formData.email,
          password: formData.password,
          name: formData.firstName.trim() + " " + formData.lastName.trim(),
          displayName: formData.displayName,
          birthDate: formData.birthdate,
          phoneNum: formData.phoneNum,
          anonymity: formData.anonymity,
        },
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
      );
      setAlertInfo({
        show: true,
        type: res.data.result,
        message: res.data.info,
      });
      setTimeout(() => {
        setAlertInfo({ show: false });
        navigate("/login");
      }, 3000);
    } catch (err) {
      setAlertInfo({
        show: true,
        type: err.response.data.result,
        message: err.response.data.info,
      });
      setTimeout(() => {
        setAlertInfo({ show: false });
      }, 3000);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 0) {
      if (validate(formData, true)) {
        try {
          const res = await api.get("/check-email", {
            params: { email: formData.email },
          });
          if (!res.data) {
            sendVerificationEmail();
          } else {
            // TODO: maybe move the message to the backend
            setAlertInfo({
              show: true,
              type: "error",
              message: t("emailAlreadyInUse"),
            });
            setTimeout(() => {
              setAlertInfo({ show: false });
            }, 3000);
          }
        } catch (err) {
          setAlertInfo({
            show: true,
            type: err.response.data.result,
            message: err.response.data.info,
          });
          setTimeout(() => {
            setAlertInfo({ show: false });
          }, 3000);
        }
      }
    } else if (step === 1) {
      checkOTPInput();
    } else {
      if (!validate(formData, true)) return;
      saveUser();
    }
  };

  const handleChange = (field) => (eOrValue) => {
    let value;

    if (eOrValue?.target?.type === "checkbox") {
      value = eOrValue.target.checked;
    } else if (dayjs.isDayjs(eOrValue) || eOrValue === null) {
      value = eOrValue;
    } else if (eOrValue?.target) {
      value = eOrValue.target.value;
    } else {
      value = eOrValue;
    }

    const newFormData = {
      ...formData,
      [field]: value,
    };
    setFormData(newFormData);

    if (
      ((step === 0 || step === 2) && typeof value === "string") ||
      field === "birthDate"
    ) {
      validate(newFormData);
    }
  };

  const validate = (data, isSubmit = false) => {
    const errors = {
      email: validateEmail({ email: data.email, t }),
      password: validatePassword({ password: data.password }),
      confirmPassword: validateMatchingPasswords({
        password: data.password,
        confirmPassword: data.confirmPassword,
        t,
      }),
      firstName: { error: false, helperText: "" },
      lastName: { error: false, helperText: "" },
      displayName: { error: false, helperText: "" },
      birthDate: validateBirthDate({
        birthDate: data.birthdate,
        t,
        dayjs,
      }),
    };
    if (step === 2) {
      const { firstName, lastName } = data;

      if (isSubmit || firstName?.trim())
        errors.firstName = validateName({
          name: firstName,
          t,
          nameField: "firstName",
        });

      if (isSubmit || lastName?.trim())
        errors.lastName = validateName({
          name: lastName,
          t,
          nameField: "lastName",
        });

      if (isSubmit || data.displayName?.trim())
        errors.displayName = validateDisplayName({
          displayName: data.displayName,
          t,
        });
    }

    const hasError = Object.values(errors).some(
      (val) => typeof val === "object" && val.error === true
    );

    setFormErrors(errors);
    return !hasError;
  };

  const rules = [
    { key: "length", label: t("passwordLength") },
    { key: "lowercase", label: t("passwordLowercase") },
    { key: "uppercase", label: t("passwordUppercase") },
    { key: "digit", label: t("passwordDigit") },
  ];

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");

    if (digits === "05") return "";

    if (!digits.startsWith("05")) return "05" + digits;

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
        {t("passwordRulesHeader")}
      </Typography>
      <Box component="ul" sx={{ pl: 2, m: 0 }}>
        {rules.map((rule) => {
          const isValid = formErrors.password[rule.key];
          return (
            <Box
              key={rule.key}
              component="li"
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: 13,
                mb: 0.5,
              }}
            >
              {isValid ? (
                <CheckIcon
                  sx={{ color: "success.main", fontSize: 16, mr: 1 }}
                />
              ) : (
                <CloseIcon sx={{ color: "error.main", fontSize: 16, mr: 1 }} />
              )}
              {rule.label}
            </Box>
          );
        })}
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
        {t("otpVerifyHeader")}
      </Typography>

      <OtpTimer reset={resetCount} />

      <Box mt={2}>
        <OTPInput
          value={formData.code}
          onChange={(code) => setFormData({ ...formData, code })}
        />
      </Box>

      <Button variant="contained" type="submit" sx={{ mt: 5 }}>
        {t("verify")}
      </Button>

      <Typography
        onClick={() => {
          if (formData.email) sendVerificationEmail();
        }}
        sx={{ cursor: "pointer", color: "primary.main", mt: 2 }}
        tabIndex={0}
        role="button"
      >
        {t("resentOtp")}
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
            label={t("firstName")}
            fullWidth
            value={formData.firstName}
            onChange={handleChange("firstName")}
            error={formErrors.firstName.error}
            helperText={formErrors.firstName.helperText}
            required
          />
          <TextField
            label={t("lastName")}
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
                checked={formData.anonymity}
                onChange={handleChange("anonymity")}
              />
            }
            label={t("appearHidden")}
          />
          <Tooltip title={t("hiddenTooltip")}>
            <InfoOutlinedIcon color="action" />
          </Tooltip>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={t("birthDate")}
            value={formData.birthDate || dayjs().subtract(8, "year")}
            onChange={handleChange("birthDate")}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                error: formErrors.birthDate.error,
                helperText: formErrors.birthDate.helperText,
                onChange: handleChange("birthDate"),
              },
            }}
            defaultValue={dayjs().subtract(8, "year")}
            maxDate={dayjs().subtract(8, "year")}
            required
          />
        </LocalizationProvider>

        <TextField
          label={t("phoneNumber")}
          placeholder="05X-XXXXXXX"
          fullWidth
          value={formData.phoneNum}
          onChange={handlePhoneChange}
          helperText={t("phoneNumberHelperText")}
          inputProps={{
            inputMode: "tel",
            maxLength: 11,
          }}
        />

        <TextField
          label={t("displayName")}
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
          {t("finishRegisration")}
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
          title={t("createAccountHeader")}
          formData={formData}
          formErrors={formErrors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitText={t("registerButton")}
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
