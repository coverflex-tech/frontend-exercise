import React from 'react';
import styled from 'styled-components';
import { CoverFlexLogo } from 'assets';
import LoginForm from 'components/LoginForm';

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    background: ${({ theme }) => theme.colors.white};
    border: ${({ theme }) => theme.colors.lightGrey};
    width: 100%;
    max-width: 600px;
`;

const Header = styled.div`
    padding: 25px;
    display: flex;
    justify-content: center;
`;

const Login = () => {
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