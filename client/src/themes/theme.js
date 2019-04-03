import { createMuiTheme } from "@material-ui/core/styles";

import blueGrey from "@material-ui/core/colors/blueGrey";

const theme = createMuiTheme({
  palette: {
    primary: { main: blueGrey[500] },
    secondary: { main: blueGrey[900] }
  },
  typography: { useNextVariants: true }
});

export default theme;
