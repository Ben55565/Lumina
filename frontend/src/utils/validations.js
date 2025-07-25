export const validateEmail = ({ email, t }) => {
  const errors = { error: false, helperText: "" };

  if (
    (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
    /[^\s!-~]/.test(email)
  ) {
    const reason = /[^\s!-~]/.test(email)
      ? t("invalidEmailLanguage")
      : t("invalidEmailStructure");

    return {
      error: true,
      helperText: `${t("invalidEmail")} (${reason})`,
    };
  }

  return errors;
};

export const validatePassword = ({ password }) => {
  const result = {
    length: password.length >= 6,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    digit: /\d/.test(password),
  };

  const failed = Object.values(result).some((val) => !val);

  return {
    ...result,
    error: failed,
  };
};

export const validateMatchingPasswords = ({ password, confirmPassword, t }) => {
  let errors = { error: false, helperText: "" };
  if (password !== confirmPassword && password && confirmPassword) {
    errors = {
      error: true,
      helperText: t("passwordsMatch"),
    };
  }
  return errors;
};

export const validateName = ({ name, t, nameField }) => {
  let errors = { error: false, helperText: "" };

  if (!name.trim() || name.length < 2) {
    errors = {
      error: true,
      helperText: t(`${nameField}HelperText`),
    };
  }

  return errors;
};

export const validateDisplayName = ({ displayName, t }) => {
  let errors = { error: false, helperText: "" };

  if (!displayName.trim() || displayName.length < 2) {
    errors = {
      error: true,
      helperText: t("invalidDisplayNameStracture"),
    };
  } else if (/[^a-zA-Z0-9\s]/.test(displayName)) {
    errors = {
      error: true,
      helperText: t("invalidDisplayNameCharacters"),
    };
  }

  return errors;
};

export const validateBirthDate = ({ birthDate, t, dayjs }) => {
  let errors = { error: false, helperText: "" };
  if (
    !birthDate ||
    !dayjs(birthDate).isValid() ||
    dayjs(birthDate).isAfter(dayjs().subtract(8, "year"))
  ) {
    if (birthDate.isAfter(dayjs())) {
      errors = {
        error: true,
        helperText: t("futureBirthDate"),
      };
    } else {
      errors = {
        error: true,
        helperText: t("invalidBirthDate"),
      };
    }
  }
  return errors;
};
