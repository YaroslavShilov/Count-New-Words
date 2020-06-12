import {ADD, DELETE, DOWNLOAD, MINUS, PLUS, UPLOAD} from "../actions/actionTypes";

const initialState = [
	{
		id: 1,
		word: 'Write',
		meaning: 'Писать',
		count: 3
	},
	{
		id: 2,
		word: 'Go',
		meaning: 'Идти',
		count: 6
	},
	{
		id: 3,
		word: 'Run',
		meaning: 'Бежать',
		count: 2
	}
]


export default function listReducer(state = initialState, action) {
	switch (action.type) {
		case ADD:
			const newItem = {
				id: (+new Date()).toString(16),
				word: action.word,
				meaning: action.meaning,
				count: 0
			}
			return [...state, newItem]
			
		
		case PLUS: 
			return countCalc(action.id, state, true);
			
		case MINUS: 
			return countCalc(action.id, state, false);
		
		case DELETE:
			return [...state.filter(item => item.id !== action.id)]
		
		case UPLOAD:
			localStorage.setItem('list', JSON.stringify(state))
			return state
		
		case DOWNLOAD:
			const newState = JSON.parse(localStorage.getItem('list') || JSON.stringify(initialState));
			return [...newState];
		
		default: return state;
	}
}

function countCalc(id, state, boolean) {
	const index = state.findIndex(item => item.id === id);
	const newItem = {...state[index]}
	
	boolean ? newItem.count++ : newItem.count--;
	if(newItem.count < 0) newItem.count = 0;
	
	return [
		...state.slice(0, index),
		newItem,
		...state.slice(index+1)
	];
}