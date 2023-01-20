import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
//Importo mi action
import {
  getRazas,
  filterByCreated,
  orderByAlf,
  orderByWeight,
  filterByTemperament,
  getTemperaments,
  searchDog,
} from "../../reduxActions/actions";

export const SearchBar = ({ setCurrentPage, setOrden }) => {
  const dispatch = useDispatch();
  //Me traigo del estado mis temperamentos para poder mapear y hacer options
  const temps = useSelector((state) => state.temperaments);
  //Estado que me guarda el NOMBRE del input search
  const [name, setName] = useState("");
  //Cuando mi componente se monta: ejecuta lo siguiente
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  //Click y recarga mis dogs
  const handleClick = (evento) => {
    evento.preventDefault();
    dispatch(getRazas());
  };
  //Filter de creacion
  const handleFilterCreated = (evento) => {
    dispatch(filterByCreated(evento.target.value));
  };
  //Filter de Temperamento
  const handleFilterTemperament = (evento) => {
    evento.preventDefault();
    dispatch(filterByTemperament(evento.target.value));
    //Seteo la pagina actual a 1
    setCurrentPage(1);
    //Modifica lo renderizado
    setOrden(`Ordenado ${evento.target.value}`);
  };
  //Order por ALF
  const handleOrderAlf = (evento) => {
    evento.preventDefault();
    dispatch(orderByAlf(evento.target.value));
    //Seteo la pagina actual a 1
    setCurrentPage(1);
    //Modifica lo renderizado
    setOrden(`Ordenado ${evento.target.value}`);
  };
  //Order por PESO
  const handleOrderWeight = (evento) => {
    evento.preventDefault();
    dispatch(orderByWeight(evento.target.value));
    //Seteo la pagina actual a 1
    setCurrentPage(1);
    //Modifica lo renderizado
    setOrden(`Ordenado ${evento.target.value}`);
  };
  //Search de PERRO
  const searchDoge = (evento) => {
    evento.preventDefault();
    setName(evento.target.value);
  };
  const submitDoge = (evento) => {
    evento.preventDefault();
    dispatch(searchDog(name));
  };
  return (
    <div className={styles.containerPadre}>
      <div className={styles.containerSelect}>
        <select
          className={styles.selectores}
          onChange={(e) => handleFilterTemperament(e)}
        >
          <option value="all">Temperaments</option>
          {temps?.map((t) => {
            return (
              <option value={t.name} key={t.id}>
                {t.name}
              </option>
            );
          })}
        </select>
        <select
          className={styles.selectores}
          onChange={(e) => handleFilterCreated(e)}
        >
          <option value="all">Todos</option>
          <option value="api">Api</option>
          <option value="created">Creadas</option>
        </select>
        <select
          className={styles.selectores}
          onChange={(e) => handleOrderAlf(e)}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select
          className={styles.selectores}
          onChange={(e) => handleOrderWeight(e)}
        >
          <option value="mayor">Mayor peso</option>
          <option value="menor">Menor peso</option>
        </select>
      </div>
      <div className={styles.sContainer}>
        <div>
          <input
            onChange={(e) => searchDoge(e)}
            type="text"
            className={styles.input}
          />
          <button
            type="submit"
            onClick={(e) => submitDoge(e)}
            className={styles.bt}
          >
            Search
          </button>
          <div>
            <button className={styles.bt} onClick={handleClick}>
              Reload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
