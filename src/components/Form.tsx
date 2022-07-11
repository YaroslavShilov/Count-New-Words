import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "./UI/Input";
import { useAppDispatch } from "../hooks";
import { addItem } from "./List/listSlice";

type Props = {
  updateSearch: (string: string) => void;
};

export const Form: React.FC<Props> = React.memo(({ updateSearch }) => {
  const dispatch = useAppDispatch();

  const [state, setState] = useState({
    word: "",
    meaning: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wordSpace = state.word.replace(/\s/g, "");
    const meaningSpace = state.meaning.replace(/\s/g, "");

    if (wordSpace.length !== 0 && meaningSpace.length !== 0) {
      const { word, meaning } = state;

      dispatch(addItem({ word, meaning }));
      //updateSearch(''); //I want to save searchList
      setState({
        ...state,
        //word: '', //I want to save searchList
        meaning: "",
      });
    }
  };
  const onChange =
    (type: "word" | "meaning") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      switch (type) {
        case "word":
          updateSearch(value);
          setState({ ...state, word: value });
          break;
        case "meaning":
          setState({ ...state, meaning: value });
          break;
        default:
          setState({ ...state });
      }
    };

  /*
useEffect(() => {
  upload();
}, [list, upload]);*/

  return (
    <FormBlock onSubmit={onSubmit}>
      <Input
        placeholder={"Add or search the word"}
        value={state.word}
        onChange={onChange("word")}
        required
      />
      <Input
        placeholder={"Meaning"}
        value={state.meaning}
        onChange={onChange("meaning")}
        required
      />
      <button>Add</button>
    </FormBlock>
  );
});

const FormBlock = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;

  input {
    max-width: 400px;
    margin-right: 10px;
  }
  button {
    border: none;
    transition: all 0.3s ease;
  }

  button:hover,
  button:focus {
    outline: none;
    box-shadow: 0 0 0 2px #36304a, 0 0 0 4px white;
  }

  button {
    display: inline-block;
    height: 32px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: white;
    cursor: pointer;
  }

  button:active {
    transition: all 0.1s ease;
    box-shadow: 0 0 0 0 black, 0 0 0 0 black, inset 0 0 8px 0 black;
  }
`;
