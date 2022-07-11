import React from "react";
import styled from "styled-components";
import {
  deleteItem,
  editItem,
  ItemState,
  minusOne,
  plusOne,
} from "./listSlice";
import { ListItem } from "./ListItem/ListItem";
import { useAppDispatch } from "../../hooks";

type Props = {
  list: ItemState[];
  length: number;
};

export const List: React.FC<Props> = ({ list, length }) => {
  const dispatch = useAppDispatch();

  return (
    <ListBlock>
      <ListHead>
        <tr>
          <th className={"column1"}>Count</th>
          <th className={"column2"}>Word</th>
          <th className={"column3"}>Meaning</th>
          <th className={"column4"}>{length}</th>
        </tr>
      </ListHead>

      <ListBody>
        {list.map(({ id, ...otherParam }) => (
          <ListItem
            key={id}
            onDelete={() => dispatch(deleteItem(id))}
            onPlus={() => dispatch(plusOne(id))}
            onMinus={() => dispatch(minusOne(id))}
            onEdit={(word: string, meaning: string) =>
              dispatch(editItem({ word, meaning, id }))
            }
            {...otherParam}
          />
        ))}
      </ListBody>
    </ListBlock>
  );
};

const ListBlock = styled.table`
  width: 100%;
  margin: 40px auto 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-collapse: collapse;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  .column1 {
    width: 122px;
  }
  .column2,
  .column3 {
    min-width: 150px;
  }
  .column2 {
  }
  .column3 {
  }
  .column4 {
    width: 82px;
    text-align: center;
  }
  tr > th:first-child,
  tr > td:first-child {
    padding-left: 30px;
  }
  tr > th:last-child,
  tr > td:last-child {
    padding-right: 30px;
  }
`;

const ListHead = styled.thead`
  background-color: #36304a;
  color: white;

  th {
    padding: 16px 10px 15px;
    font-size: 18px;
    font-weight: normal;
    text-align: left;
  }
`;
const ListBody = styled.tbody`
  tr:nth-child(even) {
    background-color: rgba(245, 245, 245, 0.9);
  }
  tr:hover {
    background-color: rgba(240, 240, 240, 0.9);
  }
`;
