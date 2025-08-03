import { InfoIcon } from "../ui/Icons.tsx";
import { useState } from "react";
import styles from "./Header.module.css";

export const Header = () => {
  const [details, setDetails] = useState<boolean>(false);

  const toggleDetails = () => setDetails(!details);

  return (
    <header className={styles.root}>
      <h1>
        Count New Words
        <span onClick={toggleDetails}>
          <InfoIcon />
        </span>
      </h1>
      {details && (
        <p>
          When you encounter a new word while reading, watching a video, or
          doing something else, you often don’t know how many times you’ll see
          that word again, and you can’t decide whether to learn it or not. With
          this application, you can add the word and count every time you come
          across it. After reading or watching, you get a summary of how many
          times the word appeared. This helps you decide whether to learn the
          word or not.
        </p>
      )}
    </header>
  );
};
