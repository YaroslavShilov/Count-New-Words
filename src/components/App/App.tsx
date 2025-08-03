import { useEffect, useReducer, useState } from "react";
import bg from "../../assets/bg.png";
import { Header } from "../Header/Header";
import { List } from "../List/List";
import { Form } from "../Form/Form.tsx";
import { Preloader } from "../Preloader/Preloader";
import { initialStore, reducer, type WordItem } from "../../store/reducer.ts";
import { DispatchContext } from "../../store/context.ts";
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

  useEffect(() => {
    dispatch({ type: "fetch" });
  }, []);

  const filteredList = sortByRating(findWords(search, words));
  const background = `url("${bg}") repeat top left`;

  return (
    <DispatchContext value={dispatch}>
      <div className={styles.root} style={{ background }}>
        <Preloader />

        <div className={styles.content}>
          <Header />

          <List list={filteredList} />

          <div className={styles.form}>
            <Form updateSearch={setSearch} />
          </div>
        </div>
      </div>
    </DispatchContext>
  );
};

export default App;
