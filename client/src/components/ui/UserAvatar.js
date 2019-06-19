import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const userAvatar = props => {
    const { darkMode, username } = props;
    if (username === null || username === undefined) return null;
    return (
        <Avatar
            style={{ color: darkMode ? 'white' : 'black' }}
        >
            {username !== undefined ? username.charAt(0).toUpperCase() : null}
        </Avatar>
    );
};

export default userAvatar;
