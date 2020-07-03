import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import AuthContext from 'context/AuthContext';


const PrivateRoute: React.FC<RouteProps> = ({ ...restProps }) => {
    const { userDetails } = useContext(AuthContext);
    if(!userDetails) {
        return (
            <Redirect to={{
                pathname: '/login'
            }}
            />
        );
    }
    return (
        <Route {...restProps} />
    );
};

export default PrivateRoute;