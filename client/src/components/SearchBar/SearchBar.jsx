import React, { useState } from "react";
//Style
import styles from "./SearchBar.module.css";
//Redux
import { useDispatch } from "react-redux";
import { searchDog } from "../../reduxActions/actions";

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  //Estado que uso para guardar el NAME de lo que enviare como payload de mi action
  const [name, setName] = useState("");
  const searchDoge = (evento) => {
    evento.preventDefault();
    setName(evento.target.value);
  };
  const submitDoge = (evento) => {
    evento.preventDefault();
    dispatch(searchDog(name));
    //Sin esto bugea
    setCurrentPage(1);
  };
  return (
    <div className={styles.containerPadre}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.input}
          onChange={(e) => searchDoge(e)}
          placeholder="Search..."
        />
        <button
          type="submit"
          className={styles.bt}
          onClick={(e) => submitDoge(e)}
        >
          🔍
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
