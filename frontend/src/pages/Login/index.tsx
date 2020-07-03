import React, { useContext, useEffect } from 'react';
import { CoverFlexLogo } from 'assets';
import LoginForm from 'components/LoginForm';
import AuthContext from 'context/AuthContext';
import { useHistory } from 'react-router-dom';
import { Wrapper, Container, Header } from './styled';

const Login = () => {
    const { userDetails } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if(history && userDetails && userDetails.userId) {
            history.replace('/');
        }
    }, [history, userDetails]);

    return (
        <Wrapper>
            <Container>
                <Header>
                    <CoverFlexLogo />
                </Header>
                <LoginForm />
            </Container>
        </Wrapper>
    );
};

export default Login;