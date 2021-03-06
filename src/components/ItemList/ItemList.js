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
		min-width: 150px;
	}
	.column2 {
	
	}
	.column3 {
	
	}
	.column4 {
		width: 82px;
		text-align:center;
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



const ItemList = ({list, length}) => {
	return (
		<ItemListBlock>
			<ItemListHead length={length}/>
			<ItemListBody list={list}/>
		</ItemListBlock>
	);
}

export default ItemList