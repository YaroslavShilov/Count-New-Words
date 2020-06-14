import React, {useState} from 'react';
import styled from 'styled-components';
import pattern from './bg/pattern.png';
import Header from "../Header/Header";
import ItemList from "../ItemList/ItemList";
import Form from "../Form/Form";
import Search from "../Search/Search";
import {connect} from "react-redux";

const AppBlock = styled.div`
	min-height: 100vh;
	padding: 30px 0;
	background: url('${pattern}') repeat top left;
	color: #10222B;
`
const AppWrap = styled.div`
	position: relative;
	max-width: 1400px;
	min-width: 520px;
	margin: 0 auto;
	padding: 0 20px 66px;
`;

const AppBottom = styled.div`
	position: fixed;
	left: 20px;
	bottom: 0;
	width: calc(100% - 40px);
	height: 96px;
	padding: 12px 30px;
	background-color: #36304A;
	border-radius: 0 0 10px 10px;
	overflow: hidden;
`


function App({itemList}) {
	
	const [state, setState] = useState({
		search: '',
	})
	
	const updateSearch = (search) => {
		setState({...state, search})
		
	}
	
	const filterList = (search, list) => {
		if(search.length === 0) {
			return list
		}
		
		return list.filter((item) => {
			const itemWordUpper = item.word.toUpperCase();
			const searchUpper = search.toUpperCase();

			return itemWordUpper.indexOf(searchUpper) > -1;
		})
	}
	
	const visibleList = filterList(state.search, itemList)
	
	return (
		<AppBlock>
			<AppWrap>
				<Header/>
				<ItemList list={visibleList}/>
				<AppBottom>
					<Search updateSearch={updateSearch}/>
					<Form/>
				</AppBottom>
			</AppWrap>
		</AppBlock>
	);
}

function mapStateToProps(state) {
	return {
		itemList: state.list
	};
}
export default connect(mapStateToProps)(App);


//**TODO: add function "edit"**//