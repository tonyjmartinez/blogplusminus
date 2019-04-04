import React from "react";
import Header from "./ui/Header";
import Layout from "./layout/Layout";
import withAppContext from "../context/withAppContext";
//import { BrowserRouter, Route, Link } from "react-router-dom";

const router = props => {
  return (
    <React.Fragment>
      <Layout />
    </React.Fragment>
  );
};

export default withAppContext(router);
