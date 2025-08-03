import styles from "./Header.module.css";

export const Header = () => (
  <header className={styles.root}>
    <h1>Count New Words</h1>
    <p>
      When you meet a new word during reading, watching a video, or something
      else. You don't know how many times you'll meet this word again, and you
      can't decide to learn this word or no. You can add this word using this
      application and every time when you meet this word you count. After
      reading or something else you get a result of counting. It helps you to
      decide. "learn this word or no"
    </p>
  </header>
);
