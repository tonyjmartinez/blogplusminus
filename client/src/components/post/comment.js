import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ReplyIcon from "@material-ui/icons/Reply";
import CancelIcon from "@material-ui/icons/Cancel";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import TextField from "@material-ui/core/TextField";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../ui/UserAvatar";
import { graphql } from "react-apollo";
import query from "../../queries/comment";
import Comments from "./comments.js";
import mutation from "../../mutations/newComment.js";
import withAppContext from '../../context/withAppContext';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    marginTop: "0.5em",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  inline: {
    display: "inline",
  },
}));

const comment = props => {
  console.log(props);
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState("");

  const { darkMode, comment } = props;
  const { username, content } = comment;
  console.log(props);

  const commentsAvailable =
    !props.data.loading && props.data.comment.comments.length > 0;


  let myUserId = null;
  let myUsername = null;
  let myToken = null;
  if (props.context.auth) {
    const user = props.context.user;
    myUserId = user.id;
    myUsername = user.username;
    myToken = user.token;
  }

  const nestedComments = () => {
    if (!open) {
      return null;
    }
    if (commentsAvailable) {
      return <Comments comments={props.data.comment.comments} {...props} />;
    } else {
      return null;
    }
  };

  useEffect(
    () => {
      console.log("useEffect");
      if (replyOpen) {
        commentField.current.focus();
      }
    },
    [replyOpen]
  );

  const commentField = useRef(null);

  /**
   * Toggles nested comment visibility
   */
  const handleClick = () => {
    setOpen(!open);
  };

  const submitComment = () => { };

  const expandBtn = () => {
    if (open && commentsAvailable) {
      return <ExpandLess style={{ color: "white" }} onClick={handleClick} />;
    } else {
      return <ExpandMore style={{ color: "white" }} onClick={handleClick} />;
    }
  };

  const handleReplyChange = e => {
    e.preventDefault();
    setReply(e.target.value);
  };

  const handleReplyOpen = e => {
    setReplyOpen(!replyOpen);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(reply);
    if (!props.context.auth) {
      return;
    }

    await props
      .mutate({
        variables: {
          commentInput: {
            userId: myUserId,
            content: reply,
            username: myUsername,
            token: myToken,
            parentType: "comment",
            parentId: comment.id
          }
        }
      })
     .then(res => {
       console.log("then");
       setReply("");
       setReplyOpen(false);
        props.data.refetch();
      });
  };

return (
  <div style={{ marginLeft: "" + 10 * props.leftMargin + "px" }}>
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <UserAvatar username={username} darkMode={darkMode} />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {username}
              </Typography>
              {" — " + content}
            </React.Fragment>
          }
        />
        {replyOpen ? (
          <CancelIcon
            onClick={handleReplyOpen}
            style={{ color: "white", display: "block" }}
          />
        ) : (
            <ReplyIcon
              onClick={handleReplyOpen}
              style={{ color: "white", display: "block" }}
            />
          )}

        {commentsAvailable ? expandBtn() : null}
      </ListItem>
      <Collapse in={replyOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Reply"
                placeholder="Press Enter to Submit"
                margin="normal"
                variant="outlined"
                fullWidth
                value={reply}
                onChange={handleReplyChange}
                inputRef={commentField}
              />
            </form>
          </ListItem>
        </List>
      </Collapse>
    </List>
    {nestedComments()}
  </div>
);
};

export default graphql(query, {
  options: props => ({ variables: { commentId: props.comment.id } }),
})(graphql(mutation)(withAppContext(comment)));
