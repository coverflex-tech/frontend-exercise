import styled from 'styled-components';

const Button = styled.button<{isLink?: boolean}>`
    background-color: ${({ theme, isLink }) => (isLink ? 'transparent' : theme.colors.orange)};
    color: ${({ theme }) => theme.colors.white};

    &:disabled {
        opacity: 0.6;
        color: ${(props) => props.theme.colors.white};
        box-shadow: none;
        cursor: not-allowed;
    }
    :hover {
        background-color: ${({ theme, isLink }) => (isLink ? 'transparent' : theme.colors.orange)};
    }
`;

export default Button;