import React, { useState } from "react";

import AppContext from "./appContext";

const appProvider = props => {
  const [auth, setAuth] = useState(false);

  const changeAuth = authStatus => {
    setAuth(authStatus);
  };

  console.log("app provider");
  return (
    <AppContext.Provider value={{ auth: auth, setAuth: setAuth }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default appProvider;
