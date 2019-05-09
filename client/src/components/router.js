import React from "react";
import Header from "./ui/Header";
import Layout from "./layout/Layout";
import withAppContext from "../context/withAppContext";
import FrontPage from "./frontPage/FrontPage";
import { BrowserRouter, Route, Link } from "react-router-dom";

const router = props => {
  return (
    <React.Fragment>
      <Layout />
      <Route path="/" exect component={FrontPage} />
    </React.Fragment>
  );
};

export default withAppContext(router);
