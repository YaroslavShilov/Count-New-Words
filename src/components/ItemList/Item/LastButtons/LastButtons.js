import React from 'react';
import TableButton from "../../../UI/TableButton";
import IconEdit from "../icons/IconEdit";
import IconDelete from "../icons/IconDelete";
import styled from 'styled-components';

const LastButtonsBlock = styled.div`
	display: flex;
	justify-content: flex-end;
	button:not(:first-child) {
		margin-left: 5px;
	}
`

const LastButtons = ({onDelete, onEdit}) => {
	return (
		<LastButtonsBlock>
			
			<TableButton bgColor={'#D4DBF5'} onClick={onEdit}>
				<IconEdit/>
			</TableButton>
			
			<TableButton bgColor={'#CF1C1C'} onClick={onDelete}>
				<IconDelete/>
			</TableButton>
			
		</LastButtonsBlock>
	);
}

export default LastButtons