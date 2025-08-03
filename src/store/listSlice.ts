// const API_URL = "http://localhost:3001";

/*export const fetchWords = createAsyncThunk(
  "list/fetchWords",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${API_URL}/list`);

      const data = await response.json();

      dispatch(uploadState(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addNewWord = createAsyncThunk(
  "list/addNewWord",
  async (
    item: { word: string; meaning: string },
    { rejectWithValue, dispatch },
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

      const data = await response.json();
      dispatch(addItem(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const editWord = createAsyncThunk(
  "list/editWord",
  async (
    values: { id: string | number; word: string; meaning: string },
    { rejectWithValue, dispatch, getState },
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

      const data = await response.json();
      dispatch(updateItem(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteWord = createAsyncThunk(
  "list/deleteWord",
  async (id: string | number, { rejectWithValue, dispatch }) => {
    try {
      await fetch(`${API_URL}/list/${id}`, {
        method: "DELETE",
      });

      dispatch(deleteItem(id));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const changeWordCount = createAsyncThunk(
  "list/changeWordCount",
  async (
    values: { id: number | string; type: "increase" | "decrease" },
    { rejectWithValue, dispatch, getState },
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

      const data = await response.json();
      dispatch(updateItem(data));
    } catch (err) {
      rejectWithValue(err.message);
    }
  },
);

 */
