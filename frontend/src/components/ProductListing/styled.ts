import styled from 'styled-components';

export const ProductListingContainer = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 200px);
    gap: 40px;
    padding: 80px 0;
`;

export const MissingProducts = styled.div`
    font-size: 32px;
    text-align: center;
    color: ${({ theme }) => theme.colors.darkGrey};
    margin: 80px 0;
    opacity: 0.4;
`;