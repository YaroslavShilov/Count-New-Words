import React from 'react';
import styled from "styled-components";
import IconPlus from "../icons/IconPlus";
import IconMinus from "../icons/IconMinus";
import Button from "../Button/Button";

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




const Count = ({count}) => {
	return (
		<CountBlock>
			<p>#1</p>
			<div className={'buttons'}>
				
				<Button bgColor={'#089C20'}><IconPlus/></Button>
				
				<Button bgColor={'#E7AA10'}><IconMinus/></Button>
				
			</div>
		</CountBlock>
	);
}

export default Count