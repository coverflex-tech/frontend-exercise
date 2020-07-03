import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.2em;
`;

export const Container = styled.div`
    background: ${({ theme }) => theme.colors.white};
    border: ${({ theme }) => theme.colors.lightGrey};
    width: 100%;
    max-width: 600px;
`;

export const Header = styled.div`
    padding: 25px;
    display: flex;
    justify-content: center;
`;
