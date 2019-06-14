import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../ui/UserAvatar";
import { graphql } from "react-apollo";
import query from "../../queries/comment";
import Comments from "./comments.js";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    marginTop: "0.5em"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  inline: {
    display: "inline"
  }
}));

const comment = props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const { darkMode, comment } = props;
  const { username, content } = comment;
  console.log(comment);
  console.log(props.data);
  const commentsAvailable =
    !props.data.loading && props.data.comment.comments.length > 0;

  let nestedComments = () => {
    if (!open) {
      return null;
    }
    if (commentsAvailable) {
      return <Comments comments={props.data.comment.comments} {...props} />;
    } else {
      return null;
    }
  };

  console.log(comment);
  /**
   * Toggles nested comment visibility
   */
  const handleClick = () => {
    setOpen(!open);
  };

  const expandBtn = () => {
    if (open && commentsAvailable) {
      return <ExpandMore style={{ color: "white" }} onClick={handleClick} />;
    } else {
      return <ExpandLess style={{ color: "white" }} onClick={handleClick} />;
    }
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
          {commentsAvailable ? expandBtn() : null}
        </ListItem>
      </List>
      {nestedComments()}
    </div>
  );
};

export default graphql(query, {
  options: props => ({ variables: { commentId: props.comment.id } })
})(comment);
