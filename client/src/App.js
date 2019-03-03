import React, { Component } from "react";
import AppProvider from "./context/appProvider";
import FooComponent from "./components/FooComponent";
import Signin from "./components/auth/Signin";

class App extends Component {
  render() {
    return (
      <AppProvider>
        <h1>App</h1>
        <FooComponent />
        <Signin />
      </AppProvider>
    );
  }
}

export default App;
