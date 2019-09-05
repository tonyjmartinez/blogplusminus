import React from 'react';
import Avatar from '@material-ui/core/Avatar';

interface Props {
  darkMode?: boolean;
  username: string | null;
}

const userAvatar = (props: Props) => {
  const { darkMode, username } = props;
  if (username === null || username === undefined) return null;
  return (
    <Avatar style={{ color: darkMode ? 'white' : 'black' }}>
      {username !== undefined ? username.charAt(0).toUpperCase() : null}
    </Avatar>
  );
};

export default userAvatar;
