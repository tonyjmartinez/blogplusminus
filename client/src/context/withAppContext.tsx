import React, {
  ReactComponentElement,
  ComponentType,
  ContextType,
  ComponentProps
} from 'react';
import { AppContext } from './AppContext';
import { Context } from 'react-apollo';

interface Props {
  onOpen?: Function;
  open?: boolean;
  onClose?: Function;
}

const withAppContext = (Component: React.ElementType) => {
  const WrapperComponent: React.StatelessComponent<Props> = props => {
    return (
      <AppContext.Consumer>
        {context => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  };
  return WrapperComponent;
};

export default withAppContext;
