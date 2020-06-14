import React from 'react';
import styled from 'styled-components';

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
		box-shadow: 0 0 0 2px #36304A, 0 0 0 4px white;
	}
`;

const Input = ({type, placeholder, value, onChange=null, required}) => {
	return (
		<InputBlock 
			type={type} 
			placeholder={placeholder} 
			value={value} 
			onChange={onChange}
			required={required}
		/>
	);
}

export default Input