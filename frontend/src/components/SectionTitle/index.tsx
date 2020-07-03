import styled from 'styled-components';

const SectionTitle = styled.div`
    color: ${({ theme }) => theme.colors.darkGrey};
    font-size: 24px;
    font-weight: 500;
    opacity: 0.8;
    width: 100%;
    padding-bottom: 15px;
    border-bottom: solid 1px ${({ theme }) => theme.colors.darkGrey};
    margin-bottom: 10px;
`;

export default SectionTitle;