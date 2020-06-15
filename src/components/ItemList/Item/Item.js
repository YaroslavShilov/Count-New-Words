import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Count from "./Count/Count";
import LastButtons from "./LastButtons/LastButtons";
import EditItem from "./EditItem/EditItem";

const ItemBlock = styled.tr`
	transition: all 0.5s ease;
	td {
		padding: 12px 10px;
	}
	input {
		box-shadow: 0 0 0 1px #36304A;
	}
`

const Item = ({count, word, meaning, onPlus, onMinus, onDelete, onEdit}) => {
	
	const [state, setState] = useState({
		edit: false,
		word,
		meaning,
	})
	
	const editItem = () => {
		setState({
			...state,
			word,
			meaning,
			edit: !state.edit
		})
	}
	
	useEffect(() => {
		setState({
			...state,
			word,
			meaning,
		})
		// eslint-disable-next-line
	}, [word, meaning])
	
	const onChange = (e, type) => {
		const value = e.target.value;
		switch(type) {
			case 'word':
				setState({...state, word: value})
				break
			case 'meaning':
				setState({...state, meaning: value})
				break
			default: return null
		}
	}
	
	const onApply = () => {
		if(state.word === word && state.meaning === meaning) {
			editItem();
		} else {
			onEdit(state.word, state.meaning);
			editItem();
		}
	}
	
	const viewWordMeaning = (
		state.edit
			? <EditItem 
					onApply={onApply} 
					onCancel={editItem} 
					onChange={onChange} 
					word={state.word} 
					meaning={state.meaning}
				/>
			: <>
					<td className={'column2'}>{state.word}</td>
					<td className={'column3'}>{state.meaning}</td>
				</>
	)
	
	return (
		<ItemBlock>
			<td className={'column1'}>
				<Count count={count} onPlus={onPlus} onMinus={onMinus}/>
			</td>
			
			
			{viewWordMeaning}
			
			<td className={'column4'}>
				<LastButtons onDelete={onDelete} onEdit={editItem}/>
			</td>
		</ItemBlock>
	);
}

export default Item