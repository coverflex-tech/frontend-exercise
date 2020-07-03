import React, { useContext, useState } from 'react';
import AuthContext from 'context/AuthContext';
import TextInput from 'components/elements/TextInput';
import Button from 'components/elements/Button';
import { LoginFormWrapper, ErrorMessage, Actions } from './styled';

const LoginForm = () => {
    const { getUserDetails, error, isLoggingIn } = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const handleLogin = () => {
        getUserDetails(userName);
    }
    return (
        <LoginFormWrapper>
            <TextInput
                label="Username:"
                onChange={(value) => setUserName(value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Actions>
                <Button disabled={isLoggingIn || !userName} onClick={handleLogin}>Login</Button>
            </Actions>
        </LoginFormWrapper>
    );
}

export default LoginForm;

