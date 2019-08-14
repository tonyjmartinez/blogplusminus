import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

// TODO: Convert to TS just like dark theme
const theme = () => {
  return createMuiTheme({
    palette: {
      secondary: { main: green['A100'] },
      primary: { main: grey[300] },
      type: 'light',
      paper: { main: green['A100'] },
      text: {
        primary: '#000000',
        secondary: '#616161'
      }
    },
    typography: { useNextVariants: true }
  });
};

export default theme;
