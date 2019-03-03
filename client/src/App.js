import React, { Component } from "react";
import AppProvider from "./context/appProvider";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/router";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./themes/theme";

const App = props => {
  return (
    <MuiThemeProvider theme={theme}>
      <AppProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AppProvider>
    </MuiThemeProvider>
  );
};

export default App;
