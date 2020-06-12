import React from 'react';
import styled from "styled-components";

const FormBlock = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto 40px;
	padding: 16px 30px;
	background-color: #36304A;
	border-radius: 0 0 10px 10px;
	input {
		width: 100%;
		max-width: 400px;
		height: 35px;
		margin-right: 15px;
		padding-left: 10px;
		padding-right: 10px;
	}
	input,
	button {
		border: none;
		transition: all 0.3s ease;
	}
	input:active,
	input:focus,
	input:hover,
	button:hover,
	button:focus {
		outline: none;
		box-shadow: 0 0 0 2px #36304A, 0 0 0 4px white;
	}
	
	button {
		display: inline-block;
		height: 35px;
		padding-left: 20px;
		padding-right: 20px;
		background-color: white;
		cursor: pointer;
	}
	
	button:active {
		transition: all 0.1s ease;
		box-shadow: 0 0 0 0 black, 0 0 0 0 black, inset 0 0 8px 0 black;
	}
	
`

const Form = () => {
	
	const onForm = (e) => {
		e.preventDefault();
	}
	
	return (
		<FormBlock onSubmit={onForm}>
			<input type="text" placeholder={'Word'} required/>
			<input type="text" placeholder={'Meaning'} required/>
			<button>Add</button>
		</FormBlock>
	);
}

export default Form