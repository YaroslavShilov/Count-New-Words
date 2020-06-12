import React from 'react';
import styled from "styled-components";
import Count from "./Count/Count";
import Button from "./Button/Button";
import IconDelete from "./icons/IconDelete";

const ItemBlock = styled.tr`
	transition: all 0.5s ease;
	td {
		padding: 12px 10px;
	}
`

const Item = ({count, word, meaning, onPlus, onMinus, onDelete}) => {
	
	return (
		<ItemBlock>
			<td className={'column1'}>
				<Count count={count} onPlus={onPlus} onMinus={onMinus}/>
			</td>
			
			<td className={'column2'}>{word}</td>
			<td className={'column3'}>{meaning}</td>
			
			<td className={'column4'}>
				<Button bgColor={'#CF1C1C'} onClick={onDelete}>
					<IconDelete/>
				</Button>
			</td>
		</ItemBlock>
	);
}

export default Item