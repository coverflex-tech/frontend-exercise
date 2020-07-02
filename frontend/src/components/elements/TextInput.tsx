import React from 'react';
import Label from './Label';
import styled from 'styled-components';

interface TextInputProps {
    label?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

const InputField = styled.input`
    border: none;
    background-color: ${({ theme }) => theme.colors.white};
    border-bottom: solid 1px ${({ theme }) => theme.colors.darkGrey};
    width: 100%;
    :focus {
        outline: none;
    }
`;

const TextInput = ({
    label,
    disabled,
    onChange,
}: TextInputProps) => (
    <>
        {label && <Label>{label}</Label>}
        <InputField disabled={disabled} onChange={(e) => onChange(e.target.value)} />
    </>
);

export default TextInput;