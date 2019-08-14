import React, {ReactComponentElement, ComponentType, Props, ContextType, ComponentProps} from 'react';
import { AppContext } from './AppContext';
import { Context } from 'react-apollo';

const withAppContext = (Component: React.ElementType)=> {
  const WrapperComponent = <T extends object>(props: Props<T>) => {
    return (
      <AppContext.Consumer>
        {context => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  };
  return WrapperComponent;
};

export default withAppContext;
