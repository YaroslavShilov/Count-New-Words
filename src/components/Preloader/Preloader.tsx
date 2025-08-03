import coffeeIcon from "../../assets/coffee.png";
import cupIcon from "../../assets/cup.png";
import styles from "./Preloader.module.css";

export const Preloader = () => (
  <div className={styles.root}>
    <div className={styles.icon}>
      <img src={coffeeIcon} alt="Coffee" />
      <div />
      <img src={cupIcon} alt="Cup" />
    </div>
  </div>
);
