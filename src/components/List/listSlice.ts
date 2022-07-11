import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ItemState {
  id: number | string;
  word: string;
  meaning: string;
  count: number;
}

const initialState: ItemState[] = [
  {
    id: 1,
    word: "Write",
    meaning: "Писать",
    count: 3,
  },
  {
    id: 2,
    word: "Go",
    meaning: "Идти",
    count: 6,
  },
  {
    id: 3,
    word: "Run",
    meaning: "Бежать",
    count: 2,
  },
];

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ word: string; meaning: string }>
    ) => {
      state.push({
        id: (+new Date()).toString(16),
        word: action.payload.word,
        meaning: action.payload.meaning,
        count: 1,
      });
    },

    plusOne: (state, action: PayloadAction<number | string>) =>
      countCalc(action.payload, state, true),

    minusOne: (state, action: PayloadAction<number | string>) =>
      countCalc(action.payload, state, false),

    deleteItem: (state, action: PayloadAction<number | string>) =>
      (state = state.filter((item) => item.id !== action.payload)),

    uploadState: (state) => localStorage.setItem("list", JSON.stringify(state)),

    downloadState: (state) => {
      (async () => {
        state = await JSON.parse(
          localStorage.getItem("list") || JSON.stringify(initialState)
        );
      })();
    },

    editItem: (
      state,
      action: PayloadAction<{
        id: number | string;
        word: string;
        meaning: string;
      }>
    ) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index].word = action.payload.word;
      state[index].meaning = action.payload.meaning;
    },
  },
});

function countCalc(
  id: string | number,
  state: ItemState[],
  boolean: boolean
): void {
  const index = state.findIndex((item) => item.id === id);

  boolean ? state[index].count++ : state[index].count--;

  if (state[index].count < 0) state[index].count = 0;
}

export const {
  addItem,
  plusOne,
  minusOne,
  deleteItem,
  uploadState,
  downloadState,
  editItem,
} = listSlice.actions;

export default listSlice.reducer;
