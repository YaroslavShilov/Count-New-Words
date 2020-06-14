import React from 'react';
import styled from 'styled-components'
import Input from "../UI/Input";

const SearchBlock = styled.div`
	input {
		margin-bottom: 10px;
	}
`

const Search = ({updateSearch}) => {
	
	return (
		<SearchBlock>
			<Input 
				type="text" 
				placeholder={'Search...'} 
				onChange={(e) => updateSearch(e.target.value)}
			/>
		</SearchBlock>
	);
}

export default Search