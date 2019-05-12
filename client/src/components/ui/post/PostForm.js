import React, { useState, useRef, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  textFieldDiv: {
    margin: "0px auto",
    width: "100%"
  },
  form: {
    display: "flex",
    flexWrap: "wrap"
  },
  formDesktop: {
    margin: "0px auto",
    width: "60%"
  },
  formMobile: {
    margin: "0px auto",
    width: "80%"
  },

  fabDiv: {
    margin: "0px auto",
    marginTop: "20px"
  },
  fabText: {
    marginRight: "10px"
  },
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
  }
});

const postForm = props => {
  console.log("postForm", props);
  const classes = useStyles();

  const [postFields, setPostFields] = useState({
    title: "",
    content: ""
  });

  const titleField = useRef(null);

  useEffect(() => {
    titleField.current.focus();
  }, []);

  const handleTitleChange = e => {
    const title = e.target.value;
    setPostFields({
      ...postFields,
      title
    });
  };

  const handleContentChange = e => {
    const content = e.target.value;
    setPostFields({
      ...postFields,
      content
    });
  };

  const handleNewPost = e => {
    console.log("handlenewpost");
    e.preventDefault();
    props.newPost(postFields.title, postFields.content);
  };

  return (
    <React.Fragment>
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
          <Button color="inherit" onClick={handleNewPost}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <div className={props.desktop ? classes.formDesktop : classes.formMobile}>
        <form onSubmit={handleNewPost} className={classes.form}>
          <div className={classes.textFieldDiv}>
            <TextField
              label="Title"
              placeholder="Title"
              margin="normal"
              variant="outlined"
              fullWidth
              value={postFields.title}
              onChange={handleTitleChange}
              inputRef={titleField}
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
              value={postFields.content}
              onChange={handleContentChange}
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
        </form>
      </div>
    </React.Fragment>
  );
};

export default postForm;
