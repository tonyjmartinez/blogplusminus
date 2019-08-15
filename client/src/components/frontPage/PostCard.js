import React, { useState, useEffect, useRef } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReplyIcon from '@material-ui/icons/Reply';
import CancelIcon from '@material-ui/icons/Cancel';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import MoreIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { useMediaQuery } from 'react-responsive';

const useStyles = makeStyles({
  card: {
    minWidth: 350
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  root: {
    marginLeft: 'auto'
  },
  commentField: {
    width: '80%',
    marginLeft: '1em',
    margin: '0px auto'
  }
});

const PostCard = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { title, username, content, dateTime, id } = props.post;
  let user = username;
  const darkMode = props.darkMode;
  const authorized = { props };

  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState('');

  const commentField = useRef(null);

  useEffect(() => {
    if (replyOpen) {
      commentField.current.focus();
    }
  }, [replyOpen]);

  const isDesktop = useMediaQuery({ query: '(min-width: 850px)' });

  const style = {
    // background: theme.palette.paper.main,
    // background: theme.overrides.MuiPaper.root,
    // margin: props.frontPage ? '0px auto' : null,
    margin: '0px auto',
    width: isDesktop ? '80%' : '100%'
  };

  if (!username) {
    user = 'user';
  }

  let dt = '';
  if (dateTime) {
    dt = moment(dateTime.toString()).fromNow();
  }

  const handleReplyChange = e => {
    setReply(e.target.value);
  };

  const handleReplyOpen = e => {
    setReplyOpen(!replyOpen);
  };

  const ReplyToggle = props => {
    if (replyOpen) {
      return <CancelIcon onClick={handleReplyOpen} className={classes.root} />;
    } else {
      return <ReplyIcon onClick={handleReplyOpen} className={classes.root} />;
    }
  };

  const DetailButtons = props => {
    const link = `/post/${id}`;
    return (
      <CardActions>
        {props.frontPage ? (
          <Link style={{ textDecoration: 'none' }} to={link}>
            <MoreIcon />
          </Link>
        ) : null}
        {props.postDetail && props.authorized ? <ReplyToggle /> : null}
      </CardActions>
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.newComment(reply).then(res => {
      setReply('');
      setReplyOpen(false);
    });
  };

  return (
    <Card style={style}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {user}
        </Typography>
        <Typography variant='h5' component='h2'>
          {title}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {dt}
        </Typography>
        <Typography component='p'>{content}</Typography>
      </CardContent>
      <DetailButtons {...props} />
      <Collapse in={replyOpen} timeout='auto' unmountOnExit>
        <Divider variant='middle' />
        <div className={classes.commentField}>
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
        </div>
      </Collapse>
    </Card>
  );
};

export default PostCard;
