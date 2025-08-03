import React from "react";
import styles from "./TableButton.module.css";

type Props = {
  bgColor: string;
  onClick: () => void;
  children: React.ReactNode;
};

export const TableButton = ({ bgColor, onClick, children }: Props) => (
  <button
    className={styles.button}
    style={{ backgroundColor: `${bgColor}` }}
    onClick={onClick}
  >
    {children}
  </button>
);
