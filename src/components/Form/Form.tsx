import React, { useState } from "react";
import { Input } from "../ui/Input/Input.tsx";
import { addNewWord } from "../store/listSlice";
import styles from "./Form.module.css";

type Props = {
  updateSearch: (string: string) => void;
};

export const Form = ({ updateSearch }: Props) => {
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

      dispatch(addNewWord({ word, meaning }));
      //updateSearch(''); //I want to save the value in searchList input
      setState({
        ...state,
        //word: '', //I want to save the value in searchList input
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

  return (
    <form className={styles.root} onSubmit={onSubmit}>
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
    </form>
  );
};
