import { createMuiTheme } from "@material-ui/core/styles";

import blueGrey from "@material-ui/core/colors/blueGrey";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";

const theme = dark => {
  return createMuiTheme({
    palette: {
      primary: { main: green["A100"] },
      secondary: { main: grey[400] },
      type: dark ? "dark" : "light",
      paper: { main: grey[300] }
    },
    typography: { useNextVariants: true }
  });
};

export default theme;
