import { Fragment, useEffect, useState } from "react";
import { TableButton } from "../../ui/TableButton/TableButton";
import { Input } from "../../ui/Input/Input";
import {
  changeWordCount,
  deleteWord,
  editWord,
  WordType,
} from "../../../store/listSlice";
import {
  ApplyIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  MinusIcon,
  PlusIcon,
} from "../../ui/Icons";
import styles from "./listItem.module.css";

export const ListItem = ({ id, count, word, meaning }: WordType) => {
  const [state, setState] = useState({
    edit: false,
    delete: false,
    count,
    word,
    meaning,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    // If store change, we need to change it in local state
    setState((state) => ({ ...state, word, meaning, count }));
  }, [word, meaning, count]);

  const editItem = () => setState({ ...state, edit: true });
  const deleteItem = () => setState({ ...state, delete: true });

  const onChange =
    (type: "word" | "meaning") => (e: React.ChangeEvent<HTMLInputElement>) =>
      setState({ ...state, [type]: e.target.value });

  const cancelHandler = () => {
    setState({
      ...state,
      word,
      meaning,
      edit: false,
      delete: false,
    });
  };

  const applyEditHandler = () => {
    if (state.word === word && state.meaning === meaning) {
      return cancelHandler();
    }

    dispatch(editWord({ id, word: state.word, meaning: state.meaning }));
    cancelHandler();
  };

  const deleteHandler = () => {
    dispatch(deleteWord(id));
    cancelHandler();
  };

  const countHandler = (type: "increase" | "decrease") => () =>
    dispatch(changeWordCount({ id, type }));

  return (
    <tr className={styles.item}>
      <td className={styles.col1}>
        <div className={styles.count}>
          <p>#{count}</p>

          <div className={styles.count__btns}>
            <TableButton bgColor="#089C20" onClick={countHandler("increase")}>
              <PlusIcon />
            </TableButton>

            <TableButton bgColor="#E7AA10" onClick={countHandler("decrease")}>
              <MinusIcon />
            </TableButton>
          </div>
        </div>
      </td>

      {state.edit ? (
        <Fragment>
          <td className={styles.col2}>
            <Input value={state.word} onChange={onChange("word")} />
          </td>
          <td className={styles.col3}>
            <Input value={state.meaning} onChange={onChange("meaning")} />
          </td>
        </Fragment>
      ) : (
        <Fragment>
          <td className={styles.col2}>{state.word}</td>
          <td className={styles.col3}>{state.meaning}</td>
        </Fragment>
      )}

      <td className={styles.col4}>
        <div className={styles.actionBtns}>
          {state.delete || state.edit ? (
            <Fragment>
              <TableButton
                bgColor="#E0E048"
                onClick={state.delete ? deleteHandler : applyEditHandler}
              >
                <ApplyIcon />
              </TableButton>

              <TableButton bgColor={"#CF1C1C"} onClick={cancelHandler}>
                <CloseIcon />
              </TableButton>
            </Fragment>
          ) : (
            <Fragment>
              <TableButton bgColor={"#D4DBF5"} onClick={editItem}>
                <EditIcon />
              </TableButton>

              <TableButton bgColor={"#CF1C1C"} onClick={deleteItem}>
                <DeleteIcon />
              </TableButton>
            </Fragment>
          )}
        </div>
      </td>
    </tr>
  );
};
