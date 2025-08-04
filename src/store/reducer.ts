import { isLocalhost } from "../main.tsx";

type Add = { type: "add" } & Pick<WordItem, "word" | "meaning">;
type Delete = { type: "delete" } & Pick<WordItem, "id">;
type Update = { type: "update"; store: WordItem[] };
type Edit = { type: "edit" } & Pick<WordItem, "id" | "word" | "meaning">;
type IncreaseCounter = { type: "increaseCounter" } & Pick<WordItem, "id">;
type DecreaseCounter = { type: "decreaseCounter" } & Pick<WordItem, "id">;

export type Action =
  | Add
  | Delete
  | Update
  | Edit
  | IncreaseCounter
  | DecreaseCounter;

export type WordItem = {
  id: number | string;
  word: string;
  meaning: string;
  count: number;
};

export const STORAGE_NAME = "words";
export const API_URL = "http://localhost:3001";

export const serverErrorHandler = (err: unknown) =>
  alert(err + " ||| Maybe you should run npm run server");

const updateLocalStorage = (state: WordItem[]) => {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(state));
};

export const initialStore: WordItem[] = [
  {
    id: 1,
    word: "Write",
    meaning: "Писать",
    count: 2,
  },
  {
    id: 3,
    word: "Run",
    meaning: "Бежать",
    count: 33,
  },
];

export const reducer = (state = initialStore, action: Action): WordItem[] => {
  switch (action.type) {
    case "update": {
      return action.store;
    }

    case "add": {
      const newWord: WordItem = {
        id: (+new Date()).toString(16),
        word: action.word,
        meaning: action.meaning,
        count: 1,
      };
      const newState = [...state, newWord];

      if (isLocalhost) {
        fetch(`${API_URL}/${STORAGE_NAME}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newWord),
        }).catch(serverErrorHandler);
      } else {
        updateLocalStorage(newState);
      }

      return newState;
    }

    case "delete": {
      const newState = [...state.filter((item) => item.id !== action.id)];

      if (isLocalhost) {
        fetch(`${API_URL}/${STORAGE_NAME}/${action.id}`, {
          method: "DELETE",
        }).catch(serverErrorHandler);
      } else {
        updateLocalStorage(newState);
      }

      return newState;
    }

    case "edit": {
      const { id, word, meaning } = action;
      const wordIndex = state.findIndex((item) => item.id === id);
      const newWord = { ...state[wordIndex], word, meaning };
      const newState = [
        ...state.slice(0, wordIndex),
        newWord,
        ...state.slice(wordIndex + 1),
      ];

      if (isLocalhost) {
        fetch(`${API_URL}/${STORAGE_NAME}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newWord),
        }).catch(serverErrorHandler);
      } else {
        updateLocalStorage(newState);
      }

      return newState;
    }

    case "increaseCounter": {
      const wordIndex = state.findIndex((item) => item.id === action.id);
      const currentWord = state[wordIndex];
      const newWord = { ...currentWord, count: currentWord.count + 1 };

      const newState = [
        ...state.slice(0, wordIndex),
        newWord,
        ...state.slice(wordIndex + 1),
      ];

      if (isLocalhost) {
        fetch(`${API_URL}/${STORAGE_NAME}/${action.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newWord),
        }).catch(serverErrorHandler);
      } else {
        updateLocalStorage(newState);
      }

      return newState;
    }

    case "decreaseCounter": {
      const wordIndex = state.findIndex((item) => item.id === action.id);
      const newWord = { ...state[wordIndex] };

      if (newWord.count > 0) {
        newWord.count--;

        const newState = [
          ...state.slice(0, wordIndex),
          newWord,
          ...state.slice(wordIndex + 1),
        ];

        if (isLocalhost) {
          fetch(`${API_URL}/${STORAGE_NAME}/${action.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newWord),
          }).catch(serverErrorHandler);
        } else {
          updateLocalStorage(newState);
        }

        return newState;
      }

      // It's already zero, we shouldn't change anything
      return state;
    }

    default:
      return state;
  }
};
