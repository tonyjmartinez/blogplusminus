import { createMuiTheme } from "@material-ui/core/styles";

import blueGrey from "@material-ui/core/colors/blueGrey";

const theme = dark => {
  return createMuiTheme({
    palette: {
      primary: { main: blueGrey[500] },
      secondary: { main: blueGrey[900] },
      type: dark ? "dark" : "light"
    },
    typography: { useNextVariants: true }
  });
};

export default theme;
