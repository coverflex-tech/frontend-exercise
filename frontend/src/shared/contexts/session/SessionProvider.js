import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../utils/api';
import SessionContext from './SessionContext';

export const SessionProvider = ({children}) => {
    const savedUserName = localStorage.getItem('coverflex_user_session');

    const [userName, setUserName] = useState(savedUserName)
    const [userState, setUserState] = useState();

    useEffect(() => {
        if(savedUserName != null) {
            const hydrateuserState = async (username) => {
                const hydratedUser = (await getUser(savedUserName)).data.user;
                setUserState(hydratedUser);
            }
    
            hydrateuserState(savedUserName);
        }
    }, [savedUserName])

    const updateUserState = useCallback((user) => {
        setUserState(user);
        setUserName(user.user_id);
        localStorage.setItem('coverflex_user_session', user.user_id);
    }, []);

    const userSignOut = useCallback((user) => {
        setUserState({});
        setUserName(null);
        localStorage.removeItem('coverflex_user_session');
    }, []);

    const updateOrderedProducts = useCallback((products) => {
        const productIds = products.map((product) => product.id);
        const newBalance = userState.data.balance - products.reduce((acc, product) => acc + product.price, 0);
        console.log('newBalance', newBalance);
        const newUserState = {
            user_id: userState.user_id,
            data: {
                balance: newBalance,
                product_ids: [...userState.data.product_ids, ...productIds]
            }
            
        }

        setUserState(newUserState);
    }, [userState]);

    return (
        <SessionContext.Provider value={ {
            userState,
            userName,
            updateUserState,
            userSignOut,
            updateOrderedProducts} }>
            { children }
        </SessionContext.Provider>
    );
}

SessionProvider.propTypes = {
    children: PropTypes.node,
}

export default SessionProvider;