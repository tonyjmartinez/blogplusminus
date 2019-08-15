import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ReplyIcon from '@material-ui/icons/Reply';
import CancelIcon from '@material-ui/icons/Cancel';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import TextField from '@material-ui/core/TextField';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import UserAvatar from '../ui/UserAvatar';
import { graphql } from 'react-apollo';
import query from '../../queries/comment';
import Comments from './Comments.js';
import mutation from '../../mutations/newComment';
import withAppContext from '../../context/withAppContext';
import Divider from '@material-ui/core/Divider';
import Fade from '../hoc/Fade';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    // backgroundColor: theme.overrides.MuiPaper.root,
    borderRadius: '5px',
    marginTop: '0.5em'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  inline: {
    display: 'inline'
  }
}));

const Comment = props => {
  const classes = useStyles();
  const theme = useTheme();

  const style = {
    // background: theme.overrides.MuiPaper.root
  };

  const [open, setOpen] = useState(true);
  const [fade, setFade] = useState(1);
  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState('');

  const { darkMode, comment } = props;
  const { username, content } = comment;
  const authorized = props.context.auth;

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

  const NestedComments = props => {
    if (props.data !== undefined && commentsAvailable && open) {
      console.log(props.data);
      return <Comments comments={props.data.comment.comments} {...props} />;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (replyOpen) {
      commentField.current.focus();
    }
  }, [replyOpen]);

  const commentField = useRef(null);
  const duration = 200;

  useEffect(() => {
    if (fade === 0) {
      setTimeout(() => {
        setOpen(false);
      }, duration);
    }
  }, [fade]);

  /**
   * Toggles nested comment visibility
   */
  const handleClick = () => {
    if (open) {
      setFade(0);
    } else {
      setOpen(true);
      setFade(1);
    }
  };

  const expandBtn = () => {
    if (open && commentsAvailable) {
      return <ExpandLess onClick={e => handleClick()} />;
    } else {
      return <ExpandMore onClick={e => handleClick()} />;
    }
  };

  const handleReplyChange = e => {
    setReply(e.target.value);
  };

  const handleReplyOpen = e => {
    setReplyOpen(!replyOpen);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!props.context.auth) {
      return;
    }

    props.context
      .newComment(myUserId, reply, myUsername, myToken, 'comment', comment.id)
      .then(res => {
        props.data.refetch();
        setReply('');
        setReplyOpen(false);
      });
  };

  const ReplyActions = props => {
    if (authorized) {
      if (replyOpen) {
        return (
          <CancelIcon onClick={handleReplyOpen} style={{ display: 'block' }} />
        );
      } else {
        return (
          <ReplyIcon onClick={handleReplyOpen} style={{ display: 'block' }} />
        );
      }
    } else {
      return null;
    }
  };

  const commentStyle = {
    marginLeft: '' + 10 * props.leftMargin + 'px'
  };

  return (
    <div style={commentStyle}>
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        className={classes.root}
        style={style}
      >
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <UserAvatar username={username} darkMode={darkMode} />
          </ListItemAvatar>
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  component='span'
                  variant='body2'
                  className={classes.inline}
                  color='textSecondary'
                >
                  {username}
                </Typography>
                <Typography
                  component='span'
                  variant='body2'
                  className={classes.inline}
                  color='textPrimary'
                >
                  {' — ' + content}
                </Typography>
              </React.Fragment>
            }
          />
          <ReplyActions />
          {commentsAvailable ? expandBtn() : null}
        </ListItem>
        <Collapse in={replyOpen} timeout='auto' unmountOnExit>
          <Divider variant='middle' />
          <List component='div' disablePadding>
            <ListItem>
              <form onSubmit={handleSubmit}>
                <TextField
                  label='Reply'
                  placeholder='Press Enter to Submit'
                  margin='normal'
                  variant='outlined'
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
      <div
        style={{
          opacity: fade,
          transition: `opacity ${duration}ms ease-in-out`
        }}
      >
        <NestedComments {...props} />
      </div>
    </div>
  );
};

export default graphql(query, {
  options: props => ({ variables: { commentId: props.comment.id } })
})(withAppContext(Comment));
