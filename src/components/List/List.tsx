import { WordType } from "../../store/listSlice";
import { ListItem } from "./ListItem/ListItem";
import styles from "./List.module.css";

type Props = {
  list: WordType[];
  length: number;
};

export const List = ({ list, length }: Props) => (
  <table className={styles.root}>
    <thead className={styles.thead}>
      <tr>
        <th className={styles.col1}>Count</th>
        <th className={styles.col2}>Word</th>
        <th className={styles.col3}>Meaning</th>
        <th className={styles.col4}>{length}</th>
      </tr>
    </thead>

    <tbody className={styles.tbody}>
      {list.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
    </tbody>
  </table>
);
