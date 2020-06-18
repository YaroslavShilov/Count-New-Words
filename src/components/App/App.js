import React, {useState} from 'react';
import styled from 'styled-components';
import pattern from './bg/pattern.png';
import Header from "../Header/Header";
import ItemList from "../ItemList/ItemList";
import Form from "../Form/Form";
import {connect} from "react-redux";

const AppBlock = styled.div`
	min-height: 100vh;
	padding: 30px 0;
	background: url('${pattern}') repeat top left;
	color: #10222B;
`
const AppWrap = styled.div`
	max-width: 1400px;
	min-width: 520px;
	margin: 0 auto;
	padding: 0 20px 26px;
`;

const AppBottom = styled.div`
	position: fixed;
	left: 50%;
	bottom: 0;
	max-width: calc(1400px - 40px);
	width: calc(100% - 40px);
	padding: 12px 30px;
	background-color: #36304A;
	border-radius: 0 0 10px 10px;
	overflow: hidden;
	transform: translate(-50%, 0);
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
			const itemWordUpper = item.word.toUpperCase().replace(/\s+/g, '');
			const searchUpper = search.toUpperCase().replace(/\s+/g, '');

			return itemWordUpper.indexOf(searchUpper) > -1;
		})
	}
	
	const ratingList = (list) => {
		return list.sort((prev, next) => next.count - prev.count);
	}
	
	
	const visibleList = ratingList(filterList(state.search, itemList));
	
	return (
		<AppBlock>
			<AppWrap>
				<Header/>
				<ItemList list={visibleList} length={itemList.length}/>
				<AppBottom>
					<Form updateSearch={updateSearch}/>
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