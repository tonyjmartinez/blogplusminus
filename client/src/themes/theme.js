import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";

const theme = dark => {
  return createMuiTheme({
    palette: {
      primary: { main: green["A100"] },
      secondary: { main: grey[300] },
      type: "light",
      paper: { main: grey[300] },
      text: {
        primary: "#000000",
        secondary: "#009688"
      }
    },
    typography: { useNextVariants: true }
  });
};

export default theme;
