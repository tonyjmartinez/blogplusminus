import React, { useState } from "react";
import { signin } from "./fetchAuth";
import AppContext from "./appContext";

const appProvider = props => {
  const [auth, setAuth] = useState(false);

  console.log("app provider");
  return (
    <AppContext.Provider
      value={{
        auth: auth,
        setAuth: setAuth,
        signin: signin
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default appProvider;
