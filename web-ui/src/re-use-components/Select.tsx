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

const StyledSelect = styled.select<{ error?: boolean }>`
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid ${({ error }) => (error ? 'red' : '#ccc')};
  border-radius: 4px;
  background-color: #fff;
  color: #333;

  &:focus {
    border-color: ${({ error }) => (error ? 'red' : '#007bff')};
    outline: none;
  }
`;

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: boolean;
}

const Select: React.FC<SelectFieldProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  error = false,
}) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <StyledSelect id={id} value={value} onChange={onChange} error={error}>
        <option value=''>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </Wrapper>
  );
};

export default Select;
