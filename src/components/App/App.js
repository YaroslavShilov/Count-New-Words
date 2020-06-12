import React from 'react';
import styled from 'styled-components';
import pattern from './bg/pattern.png';
import Header from "../Header/Header";
import ItemList from "../ItemList/ItemList";
import Form from "../Form/Form";

const AppBlock = styled.div`
	min-height: 100vh;
	padding: 30px 0;
	background: url('${pattern}') repeat fixed top left;
	color: #10222B;
`
const AppWrap = styled.div`
	max-width: 1400px;
	margin: 0 auto;
	padding: 0 40px;
`;


function App() {
	return (
		<AppBlock>
			<AppWrap>
				<Header/>
				<ItemList/>
				<Form/>
			</AppWrap>
		</AppBlock>
	);
}

export default App;

//**TODO: add function "edit"**//