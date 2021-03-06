import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withAppContext from '../../context/withAppContext';
import AuthDialog from './AuthDialog';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MediaQuery from 'react-responsive';
import MoonIcon from '@material-ui/icons/Brightness3';
import MoonIconOutlined from '@material-ui/icons/Brightness3Outlined';
import UserAvatar from './UserAvatar';

interface Props {
  context: {
    auth: boolean;
    user: {
      username: string;
    };
    setDarkMode: Function;
    darkMode: boolean;
    signOut: Function;
  };
  onOpen: Function;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  topFab: {
    marginRight: '20px'
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex: 5
  },
  extendedIcon: {
    marginRight: '5px',
    color: 'black'
  },
  fabText: {
    marginRight: '10px'
  },
  avatarDiv: {
    display: 'inline-block',
    marginRight: '10px'
  },
  moonIcon: {
    marginRight: '10px',
    marginTop: '5px',
    color: 'black'
  }
});

const Header = (props: Props) => {
  const auth = props.context.auth;
  const user = props.context.user;
  const setDarkMode = props.context.setDarkMode;
  const darkMode = props.context.darkMode;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [authType, setAuthType] = useState('login');

  const classes = useStyles();
  const openDialog = (type: string) => {
    setAuthType(type);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSignOut = () => {
    props.context.signOut();
    closeDialog();
  };

  let authButtons = null;
  let newPostButton = null;
  if (auth) {
    if (user !== null) {
      authButtons = (
        <div>
          <MediaQuery minWidth={560}>
            <Fab
              variant='extended'
              color='secondary'
              size='small'
              className={classes.topFab}
              aria-label='New'
              onClick={() => props.onOpen()}
            >
              <AddIcon className={classes.extendedIcon} />
              <span className={classes.fabText}>New Post</span>
            </Fab>
          </MediaQuery>
          <div className={classes.avatarDiv}>
            <UserAvatar
              username={user.username !== undefined ? user.username : null}
              darkMode={darkMode}
            />
          </div>
          <Button onClick={handleSignOut} color='inherit'>
            Sign Out
          </Button>
        </div>
      );

      newPostButton = (
        <MediaQuery maxWidth={559}>
          <Fab
            variant='extended'
            color='secondary'
            size='small'
            className={classes.fab}
            aria-label='New'
            onClick={() => props.onOpen()}
          >
            <AddIcon className={classes.extendedIcon} />
            <span className={classes.fabText}>New Post</span>
          </Fab>
        </MediaQuery>
      );
    }
  } else if (!auth) {
    authButtons = (
      <div>
        <AuthDialog
          open={dialogOpen}
          onClickOpen={openDialog}
          onClickClose={closeDialog}
          type={authType}
        />
        <Button onClick={() => openDialog('login')} color='inherit'>
          Log In
        </Button>
        <Button onClick={() => openDialog('signup')} color='inherit'>
          Sign Up
        </Button>
      </div>
    );
  }

  const Moon = () =>
    darkMode ? (
      <MoonIconOutlined
        className={classes.moonIcon}
        onClick={() => setDarkMode(!darkMode)}
      />
    ) : (
      <MoonIcon
        className={classes.moonIcon}
        onClick={() => setDarkMode(!darkMode)}
      />
    );

  return (
    <div className={classes.root}>
      <AppBar color='primary' position='fixed'>
        <Toolbar>
          <Typography variant='h6' color='inherit' className={classes.grow}>
            <Link to='/' className={classes.link}>
              Blog {'+/-'}
            </Link>
          </Typography>
          <Moon />
          {authButtons}
        </Toolbar>
      </AppBar>
      {newPostButton}
    </div>
  );
};

export default withAppContext(Header);
