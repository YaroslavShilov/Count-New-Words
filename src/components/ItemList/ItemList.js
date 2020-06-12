import React from 'react';
import styled from "styled-components";
import ItemListHead from "./ItemListHead";
import ItemListBody from "./ItemListBody";

const ItemListBlock = styled.table`
	width: 100%;
	margin: 40px auto 0;
	background-color: rgba(255, 255, 255, 0.5);
	border-collapse: collapse;
	border-radius: 10px 10px 0 0;
	overflow: hidden;
	.column1 {
		width: 122px;
	}
	.column2,
	.column3 {
		min-width: 300px;
	}
	.column2 {
	
	}
	.column3 {
	
	}
	.column4 {
		width: 58px;
	}
	tr>th:first-child,
	tr>td:first-child {
		padding-left: 30px;
	}
	tr>th:last-child,
	tr>td:last-child {
		padding-right: 30px;
	}
`



const ItemList = ({list}) => {
	return (
		<ItemListBlock>
			<ItemListHead/>
			<ItemListBody/>
		</ItemListBlock>
	);
}

export default ItemList