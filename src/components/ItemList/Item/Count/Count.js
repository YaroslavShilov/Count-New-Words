import React from 'react';
import styled from "styled-components";
import IconPlus from "../icons/IconPlus";
import IconMinus from "../icons/IconMinus";
import TableButton from "../../../UI/TableButton";

const CountBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	p {
		margin: 0;
		font-size: 18px;
		font-weight: bold;
	}

	.buttons {
		display: flex;
		align-items: center;
	  margin-left: 10px;
	  button:not(:last-child) {
	  	margin-right: 5px;
	  }
	}
`




const Count = ({count, onPlus, onMinus}) => {
	return (
		<CountBlock>
			<p>#{count}</p>
			<div className={'buttons'}>
				
				<TableButton bgColor={'#089C20'} onClick={onPlus}><IconPlus/></TableButton>
				
				<TableButton bgColor={'#E7AA10'} onClick={onMinus}><IconMinus/></TableButton>
				
			</div>
		</CountBlock>
	);
}

export default Count