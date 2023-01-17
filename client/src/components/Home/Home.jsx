import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
//Hooks para usar redux mas comodo
import { useDispatch, useSelector } from "react-redux";
//Importo mi action
import { getRazas } from "../../reduxActions/actions";
//Importo mis componentes
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
//ESTILO
import styles from "./Home.module.css";
import { SearchBar } from "../SearchBar/SearchBar";

const Home = () => {
  //Para despachar mis actions
  const dispatch = useDispatch();
  //Mi reemplazo de mapstateToProps
  const getDogs = useSelector((state) => state.dogs);
  //PAGINADO , estado que me indica mi pagina actual y la variable que lo modifica
  const [currentPage, setCurrentPage] = useState(1);
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

  //Cuando mi componente se monta: ejecuta lo siguiente
  useEffect(() => {
    dispatch(getRazas());
  }, [dispatch]);

  return (
    <div className={styles.padreContainer}>
      <div>
        <NavBar />
        <div className={styles.containerSyC}>
          <SearchBar />
          <Paginado
            dogsPerPage={dogsPerPage}
            getDogs={getDogs.length}
            paginado={paginado}
          />
        </div>
        <div className={styles.containerCard}>
          {currentDogs?.map((p) => {
            return (
              <Card
                name={p.name}
                image={p.image}
                temperament={p.temperament}
                weight={p.weight}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

//<button onClick={handleClick}>Recargar</button> */

// //        {/* <select>
// <option value="asc">Ascendente</option>
// <option value="desc">Descendente</option>
// </select>
// <select>
// <option value="all">Todos</option>
// <option value="api">Api</option>
// <option value="created">Creadas</option>
// </select>
// <select>
// <option value="mayor">Mayor peso</option>
// <option value="menor">Menor peso</option>
// </select> */}
