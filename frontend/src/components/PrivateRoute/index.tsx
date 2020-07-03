import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import Header from 'components/Header';


const PrivateRoute: React.FC<RouteProps> = ({ ...restProps }) => {
    const { userDetails, logout } = useContext(AuthContext);
    if(!userDetails) {
        return (
            <Redirect to={{
                pathname: '/login'
            }}
            />
        );
    }

    const { user: { data: { balance } } } = userDetails;
    return (
            <Header balance={balance} onLogout={logout} />
            <Route {...restProps} />
    );
};

export default PrivateRoute;