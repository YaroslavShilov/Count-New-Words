import { useCallback, useEffect, useState } from "react";
import bg from "../../assets/bg.png";
import { Header } from "../Header";
import { List } from "../List/List";
import { Form } from "../Form/Form.tsx";
import { Preloader } from "../Preloader/Preloader";
import { RootState } from "../../store/store";
import { fetchWords, WordType } from "../../store/listSlice";
import styles from "src/components/App/App.module.css";

function App() {
  const list = useAppSelector((state: RootState) => state.list);
  const [search, setSearch] = useState<string>("");
  const [visible, setVisible] = useState<WordType[]>(
    ratingList(filterList(search, list)),
  );

  const dispatch = useAppDispatch();

  const updateSearch = useCallback((search: string): void => {
    setSearch(search);
  }, []);

  function filterList(search: string, list: WordType[]) {
    if (search.length === 0) {
      return list;
    }

    const searchUpper = search.toUpperCase().replace(/\s+/g, "");

    return list.filter((item) => {
      const itemWordUpper = item.word.toUpperCase().replace(/\s+/g, "");

      return itemWordUpper.indexOf(searchUpper) > -1;
    });
  }

  function ratingList(list: WordType[]): WordType[] {
    return [...list].sort((prev, next) => next.count - prev.count);
  }

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  useEffect(() => {
    setVisible(ratingList(filterList(search, list)));
  }, [search, list]);

  return (
    <div
      className={styles.root}
      style={{
        background: `url("${bg}") repeat top left`,
      }}
    >
      <Preloader />
      <div className={styles.content}>
        <Header />

        <List list={visible} length={visible.length} />

        <div className={styles.form}>
          <Form updateSearch={updateSearch} />
        </div>
      </div>
    </div>
  );
}

export default App;
