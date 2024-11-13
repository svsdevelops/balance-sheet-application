import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
`;

const StyledInput = styled.input<{ error?: boolean }>`
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid ${({ error }) => (error ? 'red' : '#ccc')};
  border-radius: 4px;
  &:focus {
    border-color: ${({ error }) => (error ? 'red' : '#007bff')};
    outline: none;
  }
`;

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  min?: string;
  max?: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = false,
}) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
      />
    </Wrapper>
  );
};

export default InputField;
