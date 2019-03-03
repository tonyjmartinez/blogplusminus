import React, { useEffect } from "react";
import Header from "./ui/header";
import Signin from "./auth/Signin";
import withAppContext from "../context/withAppContext";
import { BrowserRouter, Route, Link } from "react-router-dom";

const router = props => {
  useEffect(() => {
    props.context.attemptAuth();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Signin />
    </React.Fragment>
  );
};

export default withAppContext(router);
