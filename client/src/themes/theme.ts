import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import colors from './colors';
const { black, white } = colors;

// TODO: Convert to TS just like dark theme
const theme = () => {
  return createMuiTheme({
    palette: {
      primary: { main: green['A100'] },
      secondary: { main: grey[400] },
      type: 'light',
      text: {
        primary: '#000000',
        secondary: '#616161'
      }
    },
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: white
        }
      },
      MuiList: {
        padding: {
          backgroundColor: white
        }
      },
      MuiSvgIcon: {
        root: {
          color: black
        }
      }
    }
  });
};

export default theme;
