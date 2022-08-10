import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../API";
//@ts-nocheck

export const fetchWords = createAsyncThunk(
  "list/fetchWords",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${API_URL}/list`);
      //TODO: add validate(response, errorMessage);
      const data = await response.json();
      dispatch(uploadState(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addNewWord = createAsyncThunk(
  "list/addNewWord",
  async (
    item: { word: string; meaning: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const newWord = {
        id: (+new Date()).toString(16),
        word: item.word,
        meaning: item.meaning,
        count: 1,
      };

      const response = await fetch(`${API_URL}/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      });

      //TODO: add validate(response, errorMessage);

      const data = await response.json();
      dispatch(addItem(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editWord = createAsyncThunk(
  "list/editWord",
  async (
    values: { id: string | number; word: string; meaning: string },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const { id, word, meaning } = values;
      //@ts-ignore
      const item = getState().list.find((item) => item.id === id);

      const response = await fetch(`${API_URL}/list/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          word,
          meaning,
        }),
      });

      //TODO: add validate(response, errorMessage);

      const data = await response.json();
      dispatch(updateItem(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteWord = createAsyncThunk(
  "list/deleteWord",
  async (id: string | number, { rejectWithValue, dispatch }) => {
    try {
      await fetch(`${API_URL}/list/${id}`, {
        method: "DELETE",
      });

      //TODO: add validate(response, errorMessage

      dispatch(deleteItem(id));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const changeWordCount = createAsyncThunk(
  "list/changeWordCount",
  async (
    values: { id: number | string; type: "increase" | "decrease" },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const { id, type } = values;
      //@ts-ignore
      const item = getState().list.find((item) => item.id === id);
      let count = item.count;

      switch (type) {
        case "increase":
          count++;
          break;
        case "decrease":
          count--;
          break;
      }

      const response = await fetch(`${API_URL}/list/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          count,
        }),
      });

      //TODO: add validate(response, errorMessage

      const data = await response.json();
      dispatch(updateItem(data));
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export type WordType = {
  id: number | string;
  word: string;
  meaning: string;
  count: number;
};

const initialState: WordType[] = [
  {
    id: 1,
    word: "Write",
    meaning: "Писать",
    count: 3,
  },
];

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<WordType>) => {
      state.push(action.payload);
    },

    plusOne: (state, action: PayloadAction<number | string>) =>
      countCalc(action.payload, state, true),

    minusOne: (state, action: PayloadAction<number | string>) =>
      countCalc(action.payload, state, false),

    deleteItem: (state, action: PayloadAction<number | string>) =>
      (state = state.filter((item) => item.id !== action.payload)),

    uploadState: (state, action: PayloadAction<WordType[]>) =>
      (state = action.payload),

    updateItem: (state, action: PayloadAction<WordType>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index] = action.payload;
    },
  },
  extraReducers: {},
});

function countCalc(
  id: string | number,
  state: WordType[],
  increase: boolean
): void {
  const index = state.findIndex((item) => item.id === id);

  increase ? state[index].count++ : state[index].count--;

  if (state[index].count < 0) state[index].count = 0;
}

const { uploadState, addItem, updateItem, deleteItem } = listSlice.actions;

export default listSlice.reducer;
