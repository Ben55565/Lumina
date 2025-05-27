import React, { useState } from "react";
import BaseAccountForm from "../../components/BaseAccountForm/BaseAccountForm.jsx";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({
    email: { error: false, helperText: "" },
    password: { error: false, helperText: "" },
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    validations(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", formData);
  };

  const validations = (data) => {
    const errors = {
      email: { error: false, helperText: "" },
    };
    // Should check the email and password to the db when the call is going though
    setFormErrors(errors);
  };

  return (
    <BaseAccountForm
      title="Login to existing account"
      formData={formData}
      formErrors={formErrors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitText="Login"
    />
  );
}
