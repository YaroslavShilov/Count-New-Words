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

const Item = ({count, word, meaning}) => {
	return (
		<ItemBlock>
			<td className={'column1'}><Count/></td>
			<td className={'column2'}>Learn</td>
			<td className={'column3'}>Учить \ изучать</td>
			<td className={'column4'}>
				<Button bgColor={'#CF1C1C'}><IconDelete/></Button>
			</td>
		</ItemBlock>
	);
}

export default Item