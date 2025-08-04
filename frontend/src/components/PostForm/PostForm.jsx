import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Chip,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../utils/helperFunctions.js";

const PostForm = ({ open, onClose, onSubmit, formData, setFormData }) => {
  const [errors, setErrors] = useState({
    title: false,
    visibility: false,
  });

  const { t } = useTranslation();
  const visibilityOptions = [
    { value: "PUBLIC", label: t("newPostForm.publicOption") },
    { value: "PRIVATE", label: t("newPostForm.privateOption") },
    { value: "ANONYMOUS", label: t("newPostForm.anonymousOption") },
    { value: "FRIENDS_ONLY", label: t("newPostForm.friends_onlyOption") },
  ];

  const handleSubmit = () => {
    const newErrors = {
      title: formData.title.trim() === "" || formData.title.trim().length < 2,
      visibility: formData.visibility === "",
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.visibility) {
      return;
    }
    onSubmit(formData);
    handleClose(formData);
    setFormData({
      title: "",
      visibility: "",
      content: "",
      mediaUrl: "",
      tags: [],
      tagInput: "",
      timeStamp: null,
    });
  };

  const handleAddTag = () => {
    if (
      formData.tagInput.trim() !== "" &&
      !formData.tags.includes(formData.tagInput.trim())
    ) {
      formData.tags.push(formData.tagInput.trim());
      setFormData({ ...formData, tags: formData.tags, tagInput: "" });
    }
  };

  const handleDeleteTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const handleClose = () => {
    setFormData({
      title: "",
      visibility: "",
      content: "",
      mediaUrl: "",
      tags: [],
      tagInput: "",
      timeStamp: null,
    });
    setErrors({
      title: false,
      visibility: false,
    });
    onClose();
  };

  const onRequiredChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      if (name === "title") {
        return { ...prev, title: value.trim() === "" || value.length < 2 };
      } else if (name === "visibility") {
        return { ...prev, visibility: value === "" };
      }
      return prev;
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "40vw",
          height: "85vh",
          maxWidth: "none",
          boxShadow: 5,
        },
      }}
    >
      <DialogTitle>
        {t("newPostForm.title")}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={4}>
          <TextField
            variant="standard"
            dir={isRTL(formData.title) ? "rtl" : "ltr"}
            name="title"
            label={t("newPostForm.titlePlaceholder")}
            value={formData.title}
            onChange={(e) => onRequiredChange(e)}
            required
            fullWidth
            error={errors.title}
            helperText={errors.title ? t("newPostForm.titleError") : ""}
          />
          <FormControl
            sx={{ textAlign: "center" }}
            required
            error={errors.visibility}
          >
            <FormLabel>{t("newPostForm.visibilityLabel")}</FormLabel>
            <RadioGroup
              row
              sx={{ justifyContent: "center" }}
              value={formData.visibility}
              name="visibility"
              onChange={(e) => onRequiredChange(e)}
            >
              {visibilityOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={<Radio />}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </RadioGroup>
            {errors.visibility && (
              <FormHelperText sx={{ textAlign: "center", fontSize: "0.8rem" }}>
                {t("newPostForm.visibilityError")}
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            label={t("newPostForm.contentPlaceholder")}
            dir={isRTL(formData.content) ? "rtl" : "ltr"}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            multiline
            rows={4}
            fullWidth
          />

          <TextField
            label={t("newPostForm.mediaPlaceholder")}
            value={formData.mediaUrl}
            onChange={(e) =>
              setFormData({ ...formData, mediaUrl: e.target.value })
            }
            fullWidth
          />

          {/* Tag Input */}
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label={t("newPostForm.tagsLabel")}
              value={formData.tagInput}
              onChange={(e) =>
                setFormData({ ...formData, tagInput: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddTag}>
              <Add fontSize="small" />
            </Button>
          </Stack>

          {/* Tag Display */}
          {formData.tags.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {formData.tags.map((tag, i) => (
                <Chip
                  key={i}
                  label={tag}
                  onDelete={() => handleDeleteTag(i)}
                  color="primary"
                />
              ))}
            </Stack>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>{t("newPostForm.cancelButton")}</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={errors.title || errors.visibility}
        >
          {t("newPostForm.submitButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostForm;
