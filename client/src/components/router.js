import React from "react";
import Layout from "./layout/Layout";
import withAppContext from "../context/withAppContext";
import FrontPage from "./frontPage/FrontPage";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  routes: {
    marginTop: "5em"
  }
});

const router = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Layout />
      <div className={classes.routes}>
        <Route path="/" exact component={FrontPage} />
      </div>
    </React.Fragment>
  );
};

export default withAppContext(router);
