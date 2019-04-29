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
import MediaQuery from "react-responsive";
import AddIcon from "@material-ui/icons/Add";
import withAppContext from "../../context/withAppContext";
const useStyles = makeStyles({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  submitButton: {
    background: "none",
    border: "none",
    color: "inherit"
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
    display: "flex",
    flexWrap: "wrap"
  },
  formDesktop: {
    width: "60%"
  },
  formMobile: {
    width: "80%"
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

  console.log(props);

  const handleNewPost = async e => {
    e.preventDefault();
    const newPost = await props.context.newPost(
      props.context.user.id,
      "New title",
      "new content"
    );
  };

  const PostForm = props => (
    <MediaQuery minWidth={700}>
      {matches => {
        let width;
        if (matches) {
          width = classes.formDesktop;
        } else {
          width = classes.formMobile;
        }
        return (
          <form
            onSubmit={handleNewPost}
            {...props}
            className={classes.form + " " + width}
          >
            {props.children}
          </form>
        );
      }}
    </MediaQuery>
  );

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
        <PostForm>
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
              type="submit"
            >
              <AddIcon className={classes.extendedIcon} />
              <span type="submit" className={classes.fabText}>
                Save
              </span>
            </Fab>
          </div>
        </PostForm>
      </Dialog>
    </div>
  );
};

export default withAppContext(postDialog);
