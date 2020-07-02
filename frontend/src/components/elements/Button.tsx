import styled from 'styled-components';

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.white};

    &:disabled {
        opacity: 0.6;
        color: ${(props) => props.theme.colors.white};
        box-shadow: none;
        cursor: not-allowed;
    }
    :hover {
        background-color: ${({ theme }) => theme.colors.orange};
    }
`;

export default Button;