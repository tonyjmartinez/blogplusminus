import React from "react";
import withAppContext from "../context/withAppContext.js";

const fooComponent = props => {
  console.log("Foo", props);
  return <h1>Hello</h1>;
};

export default withAppContext(fooComponent);
