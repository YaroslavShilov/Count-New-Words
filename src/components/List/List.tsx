import { ListItem } from "./ListItem/ListItem";
import styles from "./List.module.css";
import type { WordItem } from "../../store/reducer.ts";

type Props = {
  list: WordItem[];
};

export const List = ({ list }: Props) => (
  <table className={styles.root}>
    <thead className={styles.thead}>
      <tr>
        <th className={styles.col1}>Count</th>
        <th className={styles.col2}>Word</th>
        <th className={styles.col3}>Meaning</th>
        <th className={styles.col4}>{list.length}</th>
      </tr>
    </thead>

    <tbody className={styles.tbody}>
      {list.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
    </tbody>
  </table>
);
