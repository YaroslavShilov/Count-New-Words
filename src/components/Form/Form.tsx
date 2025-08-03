import React, { useContext, useState } from "react";
import { Input } from "../ui/Input/Input.tsx";
import { DispatchContext } from "../../store/context.ts";
import styles from "./Form.module.css";

type Props = {
  updateSearch: (string: string) => void;
};

export const Form = ({ updateSearch }: Props) => {
  const [state, setState] = useState({
    word: "",
    meaning: "",
  });

  const dispatch = useContext(DispatchContext);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { word, meaning } = state;

    if (word.trim() && meaning.trim()) {
      dispatch({ type: "add", word, meaning });

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

      if (type === "word") {
        updateSearch(value);
        setState({ ...state, word: value });
      } else {
        setState({ ...state, meaning: value });
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
