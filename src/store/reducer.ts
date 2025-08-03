type Add = { type: "add" } & Pick<WordItem, "word" | "meaning">;
type Delete = { type: "delete" } & Pick<WordItem, "id">;
type Fetch = { type: "fetch" };
type Edit = { type: "edit" } & Pick<WordItem, "id" | "word" | "meaning">;
type IncreaseCounter = { type: "increaseCounter" } & Pick<WordItem, "id">;
type DecreaseCounter = { type: "decreaseCounter" } & Pick<WordItem, "id">;

export type Action =
  | Add
  | Delete
  | Fetch
  | Edit
  | IncreaseCounter
  | DecreaseCounter;

export type WordItem = {
  id: number | string;
  word: string;
  meaning: string;
  count: number;
};

const isLocalhost = window.location.hostname === "localhost";
const STORAGE_NAME = "Words";

const updateLocalStorage = (state: WordItem[]) => {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(state));
};

const fetchLocalStorage = (): WordItem[] | null => {
  const newState = localStorage.getItem(STORAGE_NAME);
  return newState ? JSON.parse(newState) : null;
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
    case "fetch": {
      console.info("Database: ", isLocalhost ? "Json Server" : "LocalStorage");
      return fetchLocalStorage() || state;
    }

    case "add": {
      const newWord: WordItem = {
        id: (+new Date()).toString(16),
        word: action.word,
        meaning: action.meaning,
        count: 1,
      };
      const newState = [...state, newWord];
      updateLocalStorage(newState);
      return newState;
    }

    case "delete": {
      const newState = [...state.filter((item) => item.id !== action.id)];
      updateLocalStorage(newState);
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

      updateLocalStorage(newState);
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

      updateLocalStorage(newState);
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

        updateLocalStorage(newState);
        return newState;
      }

      // It's already zero, we shouldn't change anything
      return state;
    }

    default:
      return state;
  }
};
