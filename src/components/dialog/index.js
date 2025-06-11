import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCustom = ({
  title,
  description,
  onAgree,
  onDisagree,
  openDialog,
  agreeText = "Agree",
  disagreeText = "Disagree",
  handleClose,
  bodyCustom = null,
}) => {
  return (
    <Dialog
      open={openDialog}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth={"md"}
      sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {description}
        </DialogContentText>
        {bodyCustom && <DialogContentText>
            {bodyCustom}
        </DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onDisagree}>{disagreeText}</Button>
        <Button variant="contained" onClick={onAgree} type="submit">{agreeText}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogCustom;
