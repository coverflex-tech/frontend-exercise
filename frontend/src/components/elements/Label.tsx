import styled from 'styled-components';

const Label = styled.label`
  color: ${({ theme }) => theme.colors.darkGrey};
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
`;

export default Label;
