import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    getUser,
} from '../../shared/utils/api';
import withSession from '../../shared/contexts/session/withSession';

import styles from './Login.module.css';

const Login = ({updateUserState}) => {
    const usernameRef = useRef();
    const handleLogin = useCallback(async (event) => {
        event.preventDefault();
        const username = usernameRef.current.value;

        if(username === '') return;

        try {
            const response = await getUser(username);
            const user = response.data.user;
            updateUserState(user);
        } catch(e) {
            console.error(e);
        }
    }, [updateUserState]);

    return (
        <div className={ styles.container }>
            <h1 variant="h3" component="h1" margin="normal" className={ styles.title }>
                Login
            </h1>
            <form onSubmit={ handleLogin }>
                <label className={ styles.label }>Enter your name</label>
                <input
                    name="username"
                    label="Enter your name"
                    ref={ usernameRef }
                    className={ styles.field } />
                <button
                    type="submit"
                    className={ styles.button }
                    disabled={ usernameRef.current && usernameRef.current.value === ''}>
                    Sign in
                </button>
            </form>
        </div>
    );
}

Login.propTypes = {
    updateUserState: PropTypes.func,
}

export default withSession(Login);