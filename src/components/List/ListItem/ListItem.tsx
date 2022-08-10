import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TableButton } from "../../UI/TableButton";
import IconPlus from "./icons/IconPlus";
import IconMinus from "./icons/IconMinus";
import { Input } from "../../UI/Input";
import IconApply from "./icons/IconApply";
import IconClose from "./icons/IconClose";
import IconEdit from "./icons/IconEdit";
import IconDelete from "./icons/IconDelete";
import {
  changeWordCount,
  deleteWord,
  editWord,
  WordType,
} from "../../../store/listSlice";
import { useAppDispatch } from "../../../hooks";

export const ListItem: React.FC<WordType> = ({ id, count, word, meaning }) => {
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
    <ItemBlock>
      <td className="column1">
        <CountBlock>
          <p>#{count}</p>

          <div className="buttons">
            <TableButton bgColor="#089C20" onClick={countHandler("increase")}>
              <IconPlus />
            </TableButton>

            <TableButton bgColor="#E7AA10" onClick={countHandler("decrease")}>
              <IconMinus />
            </TableButton>
          </div>
        </CountBlock>
      </td>

      {state.edit ? (
        <React.Fragment>
          <td className="column2">
            <Input value={state.word} onChange={onChange("word")} />
          </td>
          <td className="column3">
            <Input value={state.meaning} onChange={onChange("meaning")} />
          </td>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <td className="column2">{state.word}</td>
          <td className="column3">{state.meaning}</td>
        </React.Fragment>
      )}

      <td className="column4">
        <LastButtonsBlock>
          {state.delete || state.edit ? (
            <React.Fragment>
              <TableButton
                bgColor={"#E0E048"}
                onClick={state.delete ? deleteHandler : applyEditHandler}
              >
                <IconApply />
              </TableButton>

              <TableButton bgColor={"#CF1C1C"} onClick={cancelHandler}>
                <IconClose />
              </TableButton>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <TableButton bgColor={"#D4DBF5"} onClick={editItem}>
                <IconEdit />
              </TableButton>

              <TableButton bgColor={"#CF1C1C"} onClick={deleteItem}>
                <IconDelete />
              </TableButton>
            </React.Fragment>
          )}
        </LastButtonsBlock>
      </td>
    </ItemBlock>
  );
};

const ItemBlock = styled.tr`
  transition: all 0.5s ease;
  td {
    padding: 12px 10px;
  }
  input {
    box-shadow: 0 0 0 1px #36304a;
  }
`;

const CountBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }

  .buttons {
    display: flex;
    align-items: center;
    margin-left: 10px;
    button:not(:last-child) {
      margin-right: 5px;
    }
  }
`;

const LastButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  button:not(:first-child) {
    margin-left: 5px;
  }
`;
