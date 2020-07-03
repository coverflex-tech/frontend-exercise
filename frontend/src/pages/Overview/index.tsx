import React from 'react';
import styled from 'styled-components';
import UserProducts from './UserProducts';
import AvailableProducts from './AvailableProducts';

const onMobile = '@media screen and (max-width: 1000px)';

const Container = styled.div`
    margin: 100px auto;
    max-width: 800px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    padding: 30px;
    ${onMobile} {
        margin: 100px 20px;
    }
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