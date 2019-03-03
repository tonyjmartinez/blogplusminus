import React from "react";
import Header from "./ui/header";
import Signin from "./auth/Signin";
import { BrowserRouter, Route, Link } from "react-router-dom";

const router = props => {
  return (
    <React.Fragment>
      <Header />
      <Signin />
    </React.Fragment>
  );
};

export default router;
