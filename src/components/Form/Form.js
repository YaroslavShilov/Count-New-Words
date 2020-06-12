import React, {useState} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import {countAdd} from "../../store/actions/actions";

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
		height: 32px;
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
		height: 32px;
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

const Form = ({onAdd}) => {
	const [state, setState] = useState({
		word: '',
		meaning: '',
	})
	
	const onSubmit = (e) => {
		e.preventDefault();
		const wordSpace = state.word.replace(/\s/g, '');
		const meaningSpace = state.meaning.replace(/\s/g, '');
		
		if(wordSpace.length !== 0 && meaningSpace.length !== 0) {
			onAdd(state.word, state.meaning)
			setState({
				...state,
				word: '',
				meaning: '',
			})
		}
		
	}
	const onChange = (e, type) => {
		switch(type) {
			case 'word': 
				setState({...state, word: e.target.value})
				break
			case 'meaning': 
				setState({...state, meaning: e.target.value})
				break
			default: setState({...state})
		}
	}
	
	return (
		<FormBlock onSubmit={onSubmit}>
			<input 
				type="text" 
				placeholder={'Word'} 
				value={state.word} 
				onChange={(e) => onChange(e, 'word')} 
				required
			/>
			<input 
				type="text" 
			  placeholder={'Meaning'} 
			  value={state.meaning} 
				onChange={(e) => onChange(e, 'meaning')} 
				required
			/>
			<button>Add</button>
		</FormBlock>
	);
}

function mapDispatchToProps(dispatch) {
	return {
		onAdd: (word, meaning) => dispatch(countAdd(word, meaning))
	};
}

export default connect(null, mapDispatchToProps)(Form);