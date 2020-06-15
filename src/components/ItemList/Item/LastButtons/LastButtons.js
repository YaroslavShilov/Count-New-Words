import React from 'react';
import TableButton from "../../../UI/TableButton";
import IconEdit from "../icons/IconEdit";
import IconDelete from "../icons/IconDelete";
import styled from 'styled-components';
import IconApply from "../icons/IconApply";
import IconClose from "../icons/IconClose";

const LastButtonsBlock = styled.div`
	display: flex;
	justify-content: flex-end;
	button:not(:first-child) {
		margin-left: 5px;
	}
`

const LastButtons = ({isDelete, onDelete, onApplyDelete, isEdit, onEdit, onApplyEdit, onCancel}) => {
	
	const View = () => {
		if(isDelete || isEdit) {
			
			const onApply = () => {
				if(isDelete) {
					onApplyDelete()
				} else if(isEdit) {
					onApplyEdit()
				}
			}
			
			return (
				<>
					<TableButton bgColor={'#E0E048'} onClick={onApply}>
						<IconApply/>
					</TableButton>
	
					<TableButton bgColor={'#CF1C1C'} onClick={onCancel}>
						<IconClose/>
					</TableButton>
				</>
			)
		} else {
			return (
				<>
					<TableButton bgColor={'#D4DBF5'} onClick={onEdit}>
						<IconEdit/>
					</TableButton>

					<TableButton bgColor={'#CF1C1C'} onClick={onDelete}>
						<IconDelete/>
					</TableButton>
				</>
			)
		}
	}
	
	return (
		<LastButtonsBlock>

			<View />
			
		</LastButtonsBlock>
	);
}



export default LastButtons