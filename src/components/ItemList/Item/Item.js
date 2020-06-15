import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Count from "./Count/Count";
import LastButtons from "./LastButtons/LastButtons";
import ViewWordMeaning from "./ViewWordMeaning/ViewWordMeaning";

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
		delete: false,
		word,
		meaning,
	})
	
	useEffect(() => {
		setState({
			...state,
			word,
			meaning,
		})
		// eslint-disable-next-line
	}, [word, meaning])

	const editItem = () => setState({...state, edit: true});
	const deleteItem = () => setState({...state, delete: true});
	
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
	
	const onCancel = () => {
		setState({
			...state,
			word,
			meaning,
			edit: false,
			delete: false,
		})
	}
	
	const onApplyEdit = () => {
		if(state.word === word && state.meaning === meaning) {
			onCancel();
		} else {
			onEdit(state.word, state.meaning);
			onCancel();
		}
	}
	
	return (
		<ItemBlock>
			<td className={'column1'}>
				<Count count={count} onPlus={onPlus} onMinus={onMinus}/>
			</td>
			
			
			<ViewWordMeaning 
				isEdit={state.edit} 
				word={state.word} 
				meaning={state.meaning} 
				onChange={onChange}
			/>
			
			<td className={'column4'}>
				<LastButtons
					isDelete={state.delete}
					onDelete={deleteItem}
					onApplyDelete={onDelete}
					
					isEdit={state.edit}
					onEdit={editItem}
					onApplyEdit={onApplyEdit}
					
					onCancel={onCancel}
				/>
			</td>
		</ItemBlock>
	);
}

export default Item