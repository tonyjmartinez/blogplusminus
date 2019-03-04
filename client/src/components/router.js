import React, { useEffect } from "react";
import Header from "./ui/header";
import withAppContext from "../context/withAppContext";
import { BrowserRouter, Route, Link } from "react-router-dom";

const router = props => {
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") !== null) {
      props.context.attemptAuth();
    } else {
      props.context.setAuth("unauthorized");
    }
  }, []);

  return (
    <React.Fragment>
      <Header />
    </React.Fragment>
  );
};

export default withAppContext(router);
