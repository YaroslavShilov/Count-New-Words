import React, {useState} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import {countAdd} from "../../store/actions/actions";
import Input from "../UI/Input";

const FormBlock = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0;
	
	input {
		max-width: 400px;
		margin-right: 10px;
	}
	button {
		border: none;
		transition: all 0.3s ease;
	}
	
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

const Form = ({onAdd, updateSearch}) => {
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
			//updateSearch(''); //I want to save searchList 
			setState({
				...state,
				//word: '', //I want to save searchList 
				meaning: '',
			})
		}
		
	}
	const onChange = (value, type) => {
		
		switch(type) {
			case 'word':
				updateSearch(value);
				setState({...state, word: value})
				break
			case 'meaning': 
				setState({...state, meaning: value})
				break
			default: setState({...state})
		}
	}
	
	return (
		<FormBlock onSubmit={onSubmit}>
			<Input 
				placeholder={'Add or search the word'} 
				value={state.word} 
				onChange={(e) => onChange(e.target.value, 'word')} 
				required
			/>
			<Input 
			  placeholder={'Meaning'} 
			  value={state.meaning} 
				onChange={(e) => onChange(e.target.value, 'meaning')} 
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