import React from 'react';
import Input from "../../../UI/Input";
import TableButton from "../../../UI/TableButton";
import IconApply from "../icons/IconApply";
import IconClose from "../icons/IconClose";
import styled from "styled-components";

const EditMeaning = styled.div`
	display: flex;
	align-items: center;
	button {
		margin-left: 5px;
	}
	input {
		margin-right: 5px;
	}
`

const EditItem = ({onChange, onApply, onCancel, word, meaning}) => {
	
	return (
		<>
			<td className={'column2'}>
				<Input
					value={word}
					onChange={(e) => onChange(e, 'word')}
				/>
			</td>
			<td className={'column3'}>
				<EditMeaning>
					<Input
						value={meaning}
						onChange={(e) => onChange(e, 'meaning')}
					/>
					<TableButton bgColor={'#E0E048'} onClick={onApply}>
						<IconApply/>
					</TableButton>

					<TableButton bgColor={'#CF1C1C'} onClick={onCancel}>
						<IconClose/>
					</TableButton>
				</EditMeaning>
			</td>
		</>
	);
}

export default EditItem