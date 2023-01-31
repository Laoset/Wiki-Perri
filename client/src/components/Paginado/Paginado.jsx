import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Paginado.module.css";

const Paginado = () => {
  //Mi reemplazo de mapstateToProps
  const getDogs = useSelector((state) => state.dogs);
  //PAGINADO , estado que me indica mi pagina actual y la variable que lo modifica
  const [currentPage, setCurrentPage] = useState(1);
  //Util para PAGINADO
  const [orden, setOrden] = useState("");
  //PAGINADO, estado que me indica la cantidad de PERROS por pagina que QUIERO y la variable que lo modifica
  const [dogsPerPage, setdogsPerPage] = useState(8);
  //PAGINADO, index del ultimo PERRO! esto porque va cambiando la posicion de acuerdo a la pag que este
  const lastDogIndex = currentPage * dogsPerPage;
  //PAGINADO, index del primer PERRO!
  const firstDogIndex = lastDogIndex - dogsPerPage;
  //PAGINADO, la cantidad actual de PERROS por pagina de acuerdo al index trabajo anteriormente
  const currentDogs = getDogs.slice(firstDogIndex, lastDogIndex);
  //PAGINADO, constante que toma el Npagina como parametro (cuando hago click) y modifica mi pagina actual con todo lo anterior tambien
  const paginado = (pagNumber) => {
    setCurrentPage(pagNumber);
  };
  console.log(currentPage);
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
