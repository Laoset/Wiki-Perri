import React, { useState } from "react";
import { useEffect } from "react";
//Hooks para usar redux mas comodo
import { useDispatch, useSelector } from "react-redux";
//Importo mi action
import { getRazas } from "../../reduxActions/actions";
//Importo mis componentes
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import Filtros from "../Filtros/Filtros";
import SearchBar from "../SearchBar/SearchBar";
//ESTILO
import styles from "./Home.module.css";

const Home = ({ currentDogs, setCurrentPage, setOrden }) => {
  //Loader
  const [loading, setLoading] = useState(false);
  //Para despachar mis actions
  const dispatch = useDispatch();

  //Cuando mi componente se monta: ejecuta lo siguiente
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    dispatch(getRazas());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className={styles.padreLoader}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <div className={styles.padreContainer}>
          <div className={styles.segundoContainer}>
            {currentDogs.length >= 1 ? (
              <div className={styles.navContainer}>
                <NavBar />
              </div>
            ) : null}
            <div className={styles.containerSearch}>
              <SearchBar />
            </div>
            <div className={styles.containerCartita}>
              <div className={styles.containerFiltros}>
                <Filtros setCurrentPage={setCurrentPage} setOrden={setOrden} />
              </div>
              <div className={styles.containerCard}>
                {currentDogs?.map((p) => {
                  return (
                    <Card
                      id={p.id}
                      key={p.id}
                      name={p.name}
                      image={p.image}
                      temperament={p.temperament}
                      weight={p.weight}
                      createInDb={p.createInDb}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.containerSyC}>
              <Paginado
              // dogsPerPage={dogsPerPage}
              // getDogs={getDogs.length}
              // paginado={paginado}
              // currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
