import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
 interface IAlertProps{
     title: string,
     text:string,
     open: boolean,
     onClickYes: ()=>void,
     onClickNo():void

 }
export default function AlertDialog({
  open,
  title,
  text,
  onClickYes,
  onClickNo,
}:IAlertProps) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClickNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickNo}>Disagree</Button>
          <Button onClick={onClickYes}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
