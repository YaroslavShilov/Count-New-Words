import {
  type ChangeEvent,
  type KeyboardEvent,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { TableButton } from "../../ui/TableButton/TableButton";
import { Input } from "../../ui/Input/Input";
import {
  ApplyIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  MinusIcon,
  PlusIcon,
} from "../../ui/Icons";
import { DispatchContext } from "../../../store/context.ts";
import type { WordItem } from "../../../store/reducer.ts";
import styles from "../List.module.css";

export const ListItem = ({ id, count, word, meaning }: WordItem) => {
  const [state, setState] = useState({
    edit: false,
    delete: false,
    count,
    word,
    meaning,
  });

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    // If store change, we need to change it in local state
    setState((state) => ({ ...state, word, meaning, count }));
  }, [word, meaning, count]);

  const editItem = () => setState({ ...state, edit: true });
  const deleteItem = () => setState({ ...state, delete: true });

  const onChange =
    (type: "word" | "meaning") => (e: ChangeEvent<HTMLInputElement>) =>
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

  const applyHandler = () => {
    if (state.word === word && state.meaning === meaning) {
      return cancelHandler();
    }

    dispatch({ type: "edit", id, word: state.word, meaning: state.meaning });
    cancelHandler();
  };

  const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      applyHandler();
    }
  };

  const deleteHandler = () => {
    dispatch({ type: "delete", id });
    cancelHandler();
  };

  const countHandler = (type: "increaseCounter" | "decreaseCounter") => () =>
    dispatch({ type, id });

  return (
    <tr className={styles.item}>
      <td className={styles.col1}>
        <div className={styles.count}>
          <p>#{count}</p>

          <div className={styles.count__btns}>
            <TableButton
              bgColor="#089C20"
              onClick={countHandler("increaseCounter")}
            >
              <PlusIcon />
            </TableButton>

            <TableButton
              bgColor="#E7AA10"
              onClick={countHandler("decreaseCounter")}
            >
              <MinusIcon />
            </TableButton>
          </div>
        </div>
      </td>

      {state.edit ? (
        <Fragment>
          <td className={styles.col2}>
            <Input
              value={state.word}
              onChange={onChange("word")}
              onKeyDown={keyDownHandler}
            />
          </td>
          <td className={styles.col3}>
            <Input
              value={state.meaning}
              onChange={onChange("meaning")}
              onKeyDown={keyDownHandler}
            />
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
                onClick={state.delete ? deleteHandler : applyHandler}
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
