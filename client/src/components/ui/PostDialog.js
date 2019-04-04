import React from "react";
import { makeStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },

  textFieldDiv: {
    margin: "0px auto",
    width: "100%"
  },
  form: {
    margin: "0px auto",
    width: "80%",
    display: "flex",
    flexWrap: "wrap"
  },

  fabDiv: {
    margin: "0px auto",
    marginTop: "20px"
  },
  fabText: {
    marginRight: "10px"
  }
});

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

const postDialog = props => {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={props.onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              New Post
            </Typography>
            <Button color="inherit" onClick={props.onClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.form}>
          <div className={classes.textFieldDiv}>
            <TextField
              label="Title"
              placeholder="Title"
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className={classes.textFieldDiv}>
            <TextField
              label="Content"
              placeholder="Content"
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
            />
          </div>
          <div className={classes.fabDiv}>
            <Fab
              variant="extended"
              color="secondary"
              size="small"
              aria-label="New"
              onClick={props.onOpen}
            >
              <AddIcon className={classes.extendedIcon} />
              <span className={classes.fabText}>Save</span>
            </Fab>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default postDialog;
