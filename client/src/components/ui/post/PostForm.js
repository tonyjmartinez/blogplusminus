import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/styles";

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
  }
});

const postForm = props => {
  const classes = useStyles();

  const [postFields, setPostFields] = useState({
    title: "",
    content: ""
  });

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
    e.preventDefault();
    props.newPost(postFields.title, postFields.content);
  };

  return (
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
  );
};

export default postForm;
