import { createMuiTheme } from "@material-ui/core/styles";

import blueGrey from "@material-ui/core/colors/blueGrey";
import green from "@material-ui/core/colors/green";

const theme = dark => {
  return createMuiTheme({
    palette: {
      /*primary: { main: blueGrey[500] },
      secondary: { main: blueGrey[900] },*/
      primary: { main: green["A100"] },
      secondary: { main: green["A200"] },
      type: dark ? "dark" : "light"
    },
    typography: { useNextVariants: true }
  });
};

export default theme;
