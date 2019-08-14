import React from 'react';
import { AppContext } from './AppContext';

const withAppContext = Component => {
  const WrapperComponent = props => {
    return (
      <AppContext.Consumer>
        {context => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  };
  return WrapperComponent;
};

export default withAppContext;
