import React, { useContext, useState } from 'react';
import AuthContext from 'context/AuthContext';
import TextInput from 'components/elements/TextInput';
import styled from 'styled-components';
import Button from 'components/elements/Button';

const LoginFormWrapper = styled.div`
    padding: 50px;
`;

const Actions = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

const ErrorMessage = styled.div`
    margin-top: 5px;
    color: ${({ theme }) => theme.colors.red};
    font-size: 12px;
`;

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

