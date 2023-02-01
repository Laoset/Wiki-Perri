import React from "react";
import styles from "./Paginado.module.css";

const Paginado = ({ dogsPerPage, getDogs, paginado, currentPage }) => {
  //variable que guarda los numeros de las paginas que tengo
  const pages = [];
  //Bucle que realiza la cuenta y genera la cantidad de PAGINAS que tendre en mi PAGINADO
  for (let i = 1; i <= Math.ceil(getDogs / dogsPerPage); i++) {
    //para que comienze en 1
    pages.push(i);
  }
  console.log(currentPage);
  console.log(pages.length);
  console.log(pages);
  const handleArrowRight = () => {
    if (currentPage !== pages.length) {
      paginado(currentPage + 1);
    }
  };
  const handleArrowLeft = () => {
    if (currentPage !== 1) {
      paginado(currentPage - 1);
    }
  };
  return (
    <div className={styles.containerHijo}>
      <button
        type="button"
        className={styles.bt}
        onClick={() => handleArrowLeft()}
      >
        <div className={styles.arrowLeft}></div>
      </button>
      {pages.length > 1
        ? pages.map((number) => (
            <div key={number}>
              <button
                type="button"
                className={
                  currentPage === number ? styles.buttonCurrent : styles.button
                }
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            </div>
          ))
        : null}
      <button
        type="button"
        className={styles.bt}
        onClick={() => handleArrowRight()}
      >
        <div className={styles.arrowRight}></div>
      </button>
    </div>
  );
};

export default Paginado;
