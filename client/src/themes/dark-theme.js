import { createMuiTheme } from '@material-ui/core/styles';

import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

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
      paper: { main: grey[300] }
    },
    typography: {
      useNextVariants: true
    }
  });
};

export default theme;
