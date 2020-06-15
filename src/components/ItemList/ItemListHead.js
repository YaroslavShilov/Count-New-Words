import React from 'react';
import styled from "styled-components";


const ItemListHeadBlock = styled.thead`
	background-color: #36304A;
	color: white;
	th {
		padding: 16px 10px 15px;
		font-size: 18px;
		font-weight: normal;
		text-align:left; 
	}
`

const ItemListHead = ({length}) => (
	<ItemListHeadBlock>
		<tr>
			<th className={'column1'}>Count</th>
			<th className={'column2'}>Word</th>
			<th className={'column3'}>Meaning</th>
			<th className={'column4'}>{length}</th>
		</tr>
	</ItemListHeadBlock>
);

export default ItemListHead