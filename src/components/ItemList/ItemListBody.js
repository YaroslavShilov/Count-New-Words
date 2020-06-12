import React from 'react';
import styled from "styled-components";
import Item from "./Item/Item";

const ItemListBodyBlock = styled.tbody`
	tr:nth-child(even) {
		background-color: rgba(245,245,245, 0.9);
	}
	tr:hover {
		background-color: rgba(240,240,240, 0.9);
	}
	
`
const ItemListBody = ({list}) => {
	return (
		<ItemListBodyBlock>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
		</ItemListBodyBlock>
	);
}

export default ItemListBody