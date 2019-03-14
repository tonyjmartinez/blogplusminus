import { createMuiTheme } from "@material-ui/core/styles";

import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: { main: green[300] },
    secondary: { main: "#11cb5f" }
  },
  typography: { useNextVariants: true }
});

export default theme;
