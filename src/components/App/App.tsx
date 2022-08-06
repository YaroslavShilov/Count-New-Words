import React, { useCallback, useEffect, useState } from "react";
import pattern from "./bg/pattern.png";
import { Header } from "../Header";
import { List } from "../List/List";
import { Form } from "../Form";
import { Preloader } from "../Preloader/Preloader";
import styled from "styled-components";
import { RootState } from "../../store";
import { downloadState, ItemState } from "../List/listSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

function App() {
  const list = useAppSelector((state: RootState) => state.list);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>("");
  const [visible, setVisible] = useState<ItemState[]>(
    ratingList(filterList(search, list))
  );

  const updateSearch = useCallback((search: string): void => {
    setSearch(search);
  }, []);

  function filterList(search: string, list: ItemState[]) {
    if (search.length === 0) {
      return list;
    }

    return list.filter((item) => {
      const itemWordUpper = item.word.toUpperCase().replace(/\s+/g, "");
      const searchUpper = search.toUpperCase().replace(/\s+/g, "");

      return itemWordUpper.indexOf(searchUpper) > -1;
    });
  }

  function ratingList(list: ItemState[]): ItemState[] {
    return [...list].sort((prev, next) => next.count - prev.count);
  }

  useEffect(() => {
    dispatch(downloadState());
  }, [dispatch]);

  useEffect(() => {
    setVisible(ratingList(filterList(search, list)));
  }, [search, list]);

  return (
    <AppBlock>
      <Preloader />

      {/*<AppWrap>
        <Header />

        <List list={visible} length={visible.length} />

        <AppBottom>
          <Form updateSearch={updateSearch} />
        </AppBottom>
      </AppWrap>*/}
    </AppBlock>
  );
}

const AppBlock = styled.div`
  min-height: 100vh;
  padding: 30px 0;
  background: url("${pattern}") repeat top left;
  color: #10222b;
`;
const AppWrap = styled.div`
  max-width: 1400px;
  min-width: 520px;
  margin: 0 auto;
  padding: 0 20px 26px;
`;

const AppBottom = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  max-width: calc(1400px - 40px);
  width: calc(100% - 40px);
  padding: 12px 30px;
  background-color: #36304a;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  transform: translate(-50%, 0);
`;

export default App;
