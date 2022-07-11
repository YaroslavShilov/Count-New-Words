import React, { ChangeEvent, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

type Props = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export const Input: React.FC<Props> = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  required,
}) => {
  return (
    <InputBlock
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

const InputBlock = styled.input`
  width: 100%;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  border: none;
  transition: all 0.3s ease;

  :active,
  :focus,
  :hover {
    outline: none;
    box-shadow: 0 0 0 2px #36304a, 0 0 0 4px white;
  }
`;
