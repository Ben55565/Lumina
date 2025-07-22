import React, { useState } from "react";
import BaseAccountForm from "../../components/BaseAccountForm/BaseAccountForm.jsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import api from "../../api/api.js";
import { validateEmail } from "../../utils/validations.js";

export default function LoginPage({ setAlertInfo, setJwt }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({
    email: { error: false, helperText: "" },
    password: { error: false, helperText: "" },
  });

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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
      const res = await api.post(
        "/user-login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
      );
      setJwt(res.data.token);
      localStorage.setItem("jwtToken", res.data.token);
      setAlertInfo({
        show: true,
        type: res.data.result,
        message: res.data.info,
      });
      setTimeout(() => {
        setAlertInfo({ show: false });
        navigate("/feed");
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
