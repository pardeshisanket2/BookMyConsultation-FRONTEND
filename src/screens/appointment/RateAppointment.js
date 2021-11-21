import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
 
const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    paddingTop: "0",
    margin :"15px",
    position: "absolute",
    top: theme.spacing(5),
    width: "50%",
    textAlign: "center",
    maxHeight: "80%",
    borderRadius: 0,
  },
  dialogTitle: {
    backgroundColor: "purple",
    color: "white",
    textAlign: "left",
    padding: "11px",
    height: "70px"
  },
}));
 
export default function RateAppointment(props) {
  const { title, children, openPopup } = props;
  const classes = useStyles();
 
  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex", position: "relative", top: "16px" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent style={{ textAlign: "left", padding:"20px" }}>{children}</DialogContent>
    </Dialog>
  );
}