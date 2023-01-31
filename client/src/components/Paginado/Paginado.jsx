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
  return (
    <div className={styles.containerPadre}>
      <div className={styles.containerHijo}>
        {pages.length > 1
          ? pages.map((number) => (
              <div key={number}>
                <button
                  type="button"
                  className={
                    currentPage === number
                      ? styles.buttonCurrent
                      : styles.button
                  }
                  onClick={() => paginado(number)}
                >
                  {number}
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Paginado;
