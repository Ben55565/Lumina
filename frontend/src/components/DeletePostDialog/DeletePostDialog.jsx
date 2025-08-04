import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeletePostDialog({
  open,
  setOpen,
  onClose,
  onConfirm,
}) {
  const { t } = useTranslation();

  return (
    <Box>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "70%",
            borderRadius: 2,
            boxShadow: 4,
          },
        }}
      >
        <DialogTitle>{t("postDeleteDialog.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t("postDeleteDialog.message")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ width: 150 }}>
            {t("postDeleteDialog.cancelButton")}
          </Button>
          <Button onClick={onConfirm} sx={{ width: 150 }}>
            {t("postDeleteDialog.confirmButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
