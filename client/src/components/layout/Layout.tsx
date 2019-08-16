import React, { useState, ReactChildren } from 'react';
import Header from '../ui/Header';
import PostDialog from '../ui/PostDialog';

interface Props {}

const Layout: React.StatelessComponent<Props> = props => {
  const [dlgOpen, setDlgOpen] = useState(false);

  const onClose = () => {
    setDlgOpen(false);
  };

  const onOpen = () => {
    setDlgOpen(true);
  };

  return (
    <React.Fragment>
      <Header onOpen={() => onOpen()} />
      <PostDialog open={dlgOpen} onClose={onClose} />
    </React.Fragment>
  );
};

export default Layout;
