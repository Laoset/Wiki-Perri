import React from "react";
import styles from "./Paginado.module.css";

const Paginado = ({ dogsPerPage, getDogs, paginado }) => {
  //variable que guarda los numeros de las paginas que tengo
  const pages = [];
  //Bucle que realiza la cuenta y genera la cantidad de PAGINAS que tendre en mi PAGINADO
  for (let i = 0; i <= Math.ceil(getDogs / dogsPerPage); i++) {
    //para que comienze en 1
    pages.push(i + 1);
  }
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {pages?.map((number) => (
          <li className={styles.li} key={number}>
            <button onClick={() => paginado(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginado;
