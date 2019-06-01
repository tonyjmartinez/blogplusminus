import React, { useState } from "react";
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
import PostForm from "./post/PostForm";
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

  const handleNewPost = async (title, content) => {
    const newPost = await props.context.newPost(
      props.context.user.id,
      title,
      content,
      props.context.user.username
    );
    props.onClose();
    console.log(newPost);
  };

  const getWidth = () => (
    <MediaQuery minWidth={700}>
      {matches => {
        let width;
        if (matches) {
          width = "60%";
        } else {
          width = "80%";
        }
        return width;
      }}
    </MediaQuery>
  );

  return (
    <MediaQuery minWidth={700}>
      {matches => {
        let desktop = false;
        if (matches) {
          desktop = true;
        }
        const PostFormRefs = React.forwardRef((props, ref) => (
          <PostForm
            onClose={props.onClose}
            newPost={handleNewPost}
            desktop={desktop}
            {...props}
          />
        ))
        return (
          <Dialog
            fullScreen
            open={props.open}
            onClose={props.onClose}
            TransitionComponent={Transition}
          >
            {PostFormRefs}
          </Dialog>
        );
      }}

    </MediaQuery>

  );
};

export default withAppContext(postDialog);
