import React, { useState } from "react";
import styles from "./Paginado.module.css";
import { useDispatch } from "react-redux";
import { searchDog } from "../../reduxActions/actions";
const Paginado = ({ dogsPerPage, getDogs, paginado }) => {
  //Search section
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const searchDoge = (evento) => {
    evento.preventDefault();
    setName(evento.target.value);
  };
  const submitDoge = (evento) => {
    evento.preventDefault();
    dispatch(searchDog(name));
  };
  //variable que guarda los numeros de las paginas que tengo
  const pages = [];
  //Bucle que realiza la cuenta y genera la cantidad de PAGINAS que tendre en mi PAGINADO
  for (let i = 1; i <= Math.ceil(getDogs / dogsPerPage); i++) {
    //para que comienze en 1
    pages.push(i);
  }
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
      <div>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            {pages?.map((number) => (
              <li className={styles.li} key={number}>
                <button
                  className={styles.button}
                  onClick={() => paginado(number)}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Paginado;
