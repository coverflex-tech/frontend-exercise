import styled from 'styled-components';

export const LoginFormWrapper = styled.div`
    padding: 50px;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

export const ErrorMessage = styled.div`
    margin-top: 5px;
    color: ${({ theme }) => theme.colors.red};
    font-size: 12px;
`;