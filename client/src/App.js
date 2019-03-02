import React, { Component } from "react";
import AppProvider from "./context/appProvider";
import FooComponent from "./components/FooComponent";

class App extends Component {
  render() {
    return (
      <AppProvider>
        <h1>App</h1>
        <FooComponent />
      </AppProvider>
    );
  }
}

export default App;
