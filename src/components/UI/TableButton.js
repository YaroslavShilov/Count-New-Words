import React from 'react';
import styled from "styled-components";

const ButtonBlock = styled.button`
  position: relative;
  top: 0;
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 0;
  border-radius: 3px;
  box-shadow: 0 0 0 0 black;
  cursor: pointer;
  transition: all 0.2s ease;
  :focus {
    outline: none;
  }
  :hover {
    top: -2px;
    box-shadow: 0 2px 0 0 black;
  }
  :active {
    top: 0;
    box-shadow: 0 0 0 0 black, inset 0 0 4px 0 black;
    transition: all 0.1s ease;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 14px;
    height: 14px;
    margin: -7px 0 0 -7px;
  }
  path {
    fill: white;
  }
`

const TableButton = ({bgColor, onClick=null, children}) => {
	return (
		<ButtonBlock style={{backgroundColor: `${bgColor}`}} onClick={onClick}>
			{children}
		</ButtonBlock>
	);
}

export default TableButton