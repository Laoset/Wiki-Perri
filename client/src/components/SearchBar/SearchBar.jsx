import React from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
//Importo mi action
import { getRazas } from "../../reduxActions/actions";

export const SearchBar = () => {
  const dispatch = useDispatch();
  //Click y recarga mis dogs
  const handleClick = (evento) => {
    evento.preventDefault();
    dispatch(getRazas());
  };

  return (
    <div className={styles.container}>
      <div className={styles.sContainer}>
        <button className={styles.bt} onClick={handleClick}>
          Reload
        </button>
        <input type="text" className={styles.input} />
        <button className={styles.bt}>Search</button>
      </div>
    </div>
  );
};
