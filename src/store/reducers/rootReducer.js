import {combineReducers, createStore} from "redux";
import listReducer from "./list";

export const store = createStore(combineReducers({
	list: listReducer,
}))