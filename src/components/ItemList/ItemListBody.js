import React, {useEffect} from 'react';
import styled from "styled-components";
import Item from "./Item/Item";
import {connect} from "react-redux";
import {countDelete, countMinus, countPlus, localDownload, localUpload} from "../../store/actions/actions";

const ItemListBodyBlock = styled.tbody`
	tr:nth-child(even) {
		background-color: rgba(245,245,245, 0.9);
	}
	tr:hover {
		background-color: rgba(240,240,240, 0.9);
	}
	
`
const ItemListBody = ({list, onPlus, onMinus, onDelete, upload, download}) => {

	useEffect(() => {
		download();
		//eslint-disable-next-line
	}, [])
	
	useEffect(() => {
		console.log('list upload');
		upload();
	}, [list, upload])
	
	const items = list.map(item => {
		const {id, ...otherParam} = item;
		return (
			<Item 
				key={id}
				onDelete={() => onDelete(id)}
				onPlus={() => onPlus(id)}
				onMinus={() => onMinus(id)}
				{...otherParam}
			/>
		)
	})

	return (
		<ItemListBodyBlock>
			{items}
		</ItemListBodyBlock>
	);
}

function mapStateToProps(state) {
	return {
		list: state.list
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onPlus: (itemId) => dispatch(countPlus(itemId)),
		onMinus: (itemId) => dispatch(countMinus(itemId)),
		onDelete: (itemId) => dispatch(countDelete(itemId)),
		upload: () => dispatch(localUpload()),
		download: () => dispatch(localDownload()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemListBody);
