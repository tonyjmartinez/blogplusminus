import { createMuiTheme } from '@material-ui/core/styles';

import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import { Typography } from '@material-ui/core';

const theme = () => {
  return createMuiTheme({
    palette: {
      primary: { main: green['A100'] },
      secondary: { main: grey[400] },
      type: 'dark',
      text: {
        primary: '#FFFFFF',
        secondary: '#c8e6c9'
      },
		},
		overrides: {
      MuiPaper: {
				root: {
					main: grey[800]
				}
			},
		},
  });
};

export default theme;
