import React, { useState } from "react";
import BaseAccountForm from "../../components/BaseAccountForm/BaseAccountForm.jsx";
import { useTranslation } from "react-i18next";
import api from "../../api/api.js";
import { validateEmail } from "../../utils/validations.js";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({
    email: { error: false, helperText: "" },
    password: { error: false, helperText: "" },
  });

  const { t, i18n } = useTranslation();

  const handleChange = (field) => (e) => {
    const newFormErrors = { email: { error: false, helperText: "" } };
    const newFormData = {
      ...formData,
      [field]: e.target.value,
    };
    if (field === "email") {
      newFormErrors.email = validateEmail({
        data: { email: e.target.value },
        t,
      });
    }

    setFormData(newFormData);
    setFormErrors(newFormErrors);

    return !newFormErrors.email.error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(
        "/user-login",
        {
          params: {
            email: formData.email,
            password: formData.password,
          },
        },
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
      );
      console.log("Login response:", res);
    } catch (err) {}
    console.log("Logging in:", formData);
  };

  return (
    <BaseAccountForm
      title={t("loginHeader")}
      formData={formData}
      formErrors={formErrors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitText={t("loginButton")}
    />
  );
}
