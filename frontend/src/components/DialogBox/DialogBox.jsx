import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogBox({
  showDialogBox,
  setshowDialogBox,
  navigateDir,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClose = () => {
    setshowDialogBox(false);
    navigate(navigateDir);
  };

  return (
    <React.Fragment>
      <Dialog
        open={showDialogBox}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={() => setshowDialogBox(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t("DialogBox.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t("DialogBox.message")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ width: "30%" }}>
            {t("DialogBox.buttonText")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
