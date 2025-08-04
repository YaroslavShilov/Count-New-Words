import { useEffect, useReducer, useState } from "react";
import bg from "../../assets/bg.png";
import { Header } from "../Header/Header";
import { List } from "../List/List";
import { Form } from "../Form/Form.tsx";
import { Preloader } from "../Preloader/Preloader";
import {
  API_URL,
  initialStore,
  reducer,
  serverErrorHandler,
  STORAGE_NAME,
  type WordItem,
} from "../../store/reducer.ts";
import { DispatchContext } from "../../store/context.ts";
import { isLocalhost } from "../../main.tsx";
import styles from "./App.module.css";

// Remove spaces and convert to uppercase
const formatText = (text: string) => text.toUpperCase().replace(/\s+/g, "");

// Search words by formatted match
const findWords = (search: string, list: WordItem[]): WordItem[] => {
  if (!search.trim()) {
    return list;
  }

  const formattedSearch = formatText(search);

  return list.filter(({ word }) => formatText(word).includes(formattedSearch));
};

const sortByRating = (list: WordItem[]) =>
  [...list].sort((prev, next) => next.count - prev.count);

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [words, dispatch] = useReducer(reducer, initialStore);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (isLocalhost) {
      // Json Server
      fetch(`${API_URL}/${STORAGE_NAME}`)
        .then((res) => res.json() as Promise<WordItem[]>)
        .then((store) => {
          dispatch({ type: "update", store });
        })
        .catch(serverErrorHandler)
        .finally(() => setIsLoading(false));
    } else {
      // LocalStorage
      const newState = localStorage.getItem(STORAGE_NAME);
      // If we have data in LocalStorage, otherwise use initialStore
      if (newState) {
        dispatch({
          type: "update",
          store: JSON.parse(newState),
        });
      }
      setIsLoading(false);
    }
  }, []);

  const filteredList = sortByRating(findWords(search, words));
  const background = `url("${bg}") repeat top left`;

  return (
    <DispatchContext value={dispatch}>
      <div className={styles.root} style={{ background }}>
        <Preloader />

        <div className={styles.content}>
          <Header />

          {isLoading ? "Loading..." : <List list={filteredList} />}

          <div className={styles.form}>
            <Form updateSearch={setSearch} />
          </div>
        </div>
      </div>
    </DispatchContext>
  );
};

export default App;
