import Input from "../../../UI/Input";
import React from "react";

const ViewWordMeaning = ({isEdit, word, meaning, onChange}) => {
	if(isEdit) {
		return (
			<>
				<td className={'column2'}>
					<Input
						value={word}
						onChange={(e) => onChange(e, 'word')}
					/>
				</td>
				<td className={'column3'}>
					<Input
						value={meaning}
						onChange={(e) => onChange(e, 'meaning')}
					/>
				</td>
			</>
		)
	} else {
		return (
			<>
				<td className={'column2'}>{word}</td>
				<td className={'column3'}>{meaning}</td>
			</>
		)
	}
}

export default ViewWordMeaning