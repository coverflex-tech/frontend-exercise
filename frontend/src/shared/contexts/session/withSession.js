import React, { forwardRef } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import SessionContext from './SessionContext';

const getDisplayName = (WrappedComponent) =>
    WrappedComponent.displayName || WrappedComponent.name || 'Component';


export const withSession = (WrappedComponent) => {
    const SessionWrapper = forwardRef((props, ref) => (
        <SessionContext.Consumer>
            { (value) => <WrappedComponent ref={ ref } { ...props } { ...value } /> }
        </SessionContext.Consumer>
    ));

    SessionWrapper.displayName = `withSession(${getDisplayName(WrappedComponent)})`;
    hoistNonReactStatics(SessionWrapper, WrappedComponent);

    return SessionWrapper;
};

export default withSession;