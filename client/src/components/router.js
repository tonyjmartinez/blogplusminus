import React, { useEffect } from "react";
import Header from "./ui/Header";
import withAppContext from "../context/withAppContext";
import { BrowserRouter, Route, Link } from "react-router-dom";

const router = props => {
  useEffect(() => {
    props.context.attemptAuth();
  }, []);

  console.log(props);

  return (
    <React.Fragment>
      <Header />
    </React.Fragment>
  );
};

export default withAppContext(router);
