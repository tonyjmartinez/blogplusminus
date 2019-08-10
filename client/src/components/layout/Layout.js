import React, { useState } from 'react';
import Header from '../ui/Header.js';
import PostDialog from '../ui/PostDialog';
const Layout = props => {
  const [dlgOpen, setDlgOpen] = useState(false);

  const onClose = () => {
    setDlgOpen(false);
  };

  const onOpen = () => {
    setDlgOpen(true);
  };

  return (
    <React.Fragment>
      <Header onOpen={onOpen} />
      <PostDialog open={dlgOpen} onClose={onClose} />
      {props.children}
    </React.Fragment>
  );
};

export default Layout;
