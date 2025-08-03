import React from "react";
import styles from "./Input.module.css";

export const Input = ({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className={styles.input} {...props} />
);
