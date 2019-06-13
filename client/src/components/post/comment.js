import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import UserAvatar from '../ui/UserAvatar';
import { graphql } from 'react-apollo';
import query from '../../queries/comment';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    marginTop: '0.5em',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  inline: {
    display: 'inline',
  },
}));

const comment = props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const { darkMode, comment } = props;
  const { username, content } = comment;
  if (!props.data.loading) {
    console.log(props.data);
  }

  console.log(comment);
  /**
       * Toggles nested comment visibility
       */
  function handleClick() {
    setOpen(!open);
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <UserAvatar
            username={username}
            darkMode={darkMode}
          />
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
              {' — ' + content}
            </React.Fragment>
          }
        />
        {open ? <ExpandLess onClick={handleClick} />
          : <ExpandMore onClick={handleClick} />}
      </ListItem>
    </List>
  );
};

export default graphql(query, {
  options: props => ({ variables: { commentId: props.comment.id } }),
})(comment);
