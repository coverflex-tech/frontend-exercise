import React from 'react';
import styled from 'styled-components';
import UserProducts from './UserProducts';
import AvailableProducts from './AvailableProducts';

const Container = styled.div`
    margin: 100px auto 0;
    width: 100%;
    max-width: 800px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    padding: 30px;
`;

const Overview = () => {
    return (
        <Container>
            <UserProducts />
            <AvailableProducts />
        </Container>
    )
};

export default Overview;