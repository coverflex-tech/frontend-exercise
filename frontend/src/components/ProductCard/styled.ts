import styled from 'styled-components';

export const Card = styled.div<{selected?: boolean}>`
background-color: ${({ theme }) => theme.colors.lightGrey};
padding: 20px;
display: grid;
grid-template-rows: 40px 75px 50px;
row-gap: 25px;
align-items: center;
text-align: center;
border-radius: 8px;
opacity: 0.9;
border: ${({ theme, selected }) => (selected ? `solid 2px ${theme.colors.orange}` : `solid 1px ${theme.colors.darkGrey}`)};
button {
    width: 100%;
    padding: 16px 8px;
}
`;

export const Title = styled.div`
font-size: 18px;
font-weight: 600;
`;

export const ImageContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
img {
    max-width: 75px;
    height: 60px;
}
`;

export const Price = styled.div`
margin-top: auto;
display: flex;
align-items: center;
justify-content: center;
svg {
    fill: ${({ theme }) => theme.colors.orange};
}
`;