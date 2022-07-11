import {ADD, DELETE, DOWNLOAD, EDIT, MINUS, PLUS, UPLOAD} from "./actionTypes";

export const countPlus = (id) => ({type: PLUS, id}); 
export const countMinus = (id) => ({type: MINUS, id}); 
export const countDelete = (id) => ({type: DELETE, id}); 
export const countAdd = (word, meaning) => ({type: ADD, word, meaning});
export const itemEdit = (id, word, meaning) => ({type: EDIT, id, word, meaning});
export const localUpload = () => ({type: UPLOAD}); 
export const localDownload = () => ({type: DOWNLOAD}); 