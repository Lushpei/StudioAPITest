import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

export const DialogBox = ({
                     open,
                     handleClose,
                     title,
                     desc,
                     textAgree,
                     handleAgree,
                     textDisagree,
                     handleDisagree
                   }) => {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {desc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>{textDisagree}</Button>
        <Button onClick={handleAgree} autoFocus>
          {textAgree}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
