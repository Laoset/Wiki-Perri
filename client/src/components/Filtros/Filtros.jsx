import React, { useEffect } from "react";
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
  filterByAllDogs,
} from "../../reduxActions/actions";
// const uniqueTemperaments = (temperaments) => {
//   const uniqueNames = [];
//   return temperaments.filter((temperament) => {
//     if (uniqueNames.indexOf(temperament.name) === -1) {
//       uniqueNames.push(temperament.name);
//       return true;
//     }
//     return false;
//   });
// };
export const Filtros = ({ setCurrentPage, setOrden }) => {
  const dispatch = useDispatch();
  //Me traigo del estado mis temperamentos para poder mapear y hacer options
  let temps = useSelector((state) => state.temperaments);
  //Filtradado de NAMES unicos
  let uniqueNames = [...new Set(temps.map((temp) => temp.name.trim()))];
  console.log(uniqueNames);
  // let uniqueTemps = uniqueNames.map((name) => {
  //   return temps.find((temp) => temp.name.trim() === name);
  // });
  // console.log(uniqueTemps);
  //Filtrado limpiando los vacios
  let uniqueTempsSinVacio = uniqueNames.filter(
    (temp) => temp.name.trim() !== ""
  );
  console.log(uniqueTempsSinVacio);
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
    let payload = evento.target.value;
    if (payload === "allDogs") {
      dispatch(filterByAllDogs());
    } else {
      dispatch(filterByCreated(payload));
    }
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

  //FUNCION QUE ABARCA MIS ORDENAMIENTOS
  const handleOpChange = (evento) => {
    const selectedOption = evento.target.value;
    // setSelectedOption(selectedOption);
    // setIsOpen(true);
    if (selectedOption === "alfAsc") {
      dispatch(orderByAlf("asc"));
      //Seteo la pagina actual a 1
      setCurrentPage(1);
      //Modifica lo renderizado
      setOrden(`Ordenado ${evento.target.value}`);
    } else if (selectedOption === "alfDesc") {
      dispatch(orderByAlf("desc"));
      //Seteo la pagina actual a 1
      setCurrentPage(1);
      //Modifica lo renderizado
      setOrden(`Ordenado ${evento.target.value}`);
    } else if (selectedOption === "weightMayor") {
      dispatch(orderByWeight("mayor"));
      //Seteo la pagina actual a 1
      setCurrentPage(1);
      //Modifica lo renderizado
      setOrden(`Ordenado ${evento.target.value}`);
    } else if (selectedOption === "weightMenor") {
      dispatch(orderByWeight("menor"));
      //Seteo la pagina actual a 1
      setCurrentPage(1);
      //Modifica lo renderizado
      setOrden(`Ordenado ${evento.target.value}`);
    }
  };
  return (
    <div className={styles.containerPadre}>
      <div className={styles.containerSelect}>
        <select
          className={styles.selectores}
          onChange={(e) => handleFilterTemperament(e)}
        >
          <option value="all">Temperaments</option>
          {uniqueTempsSinVacio?.map((t) => {
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
          <option value="allDogs">Origin</option>
          <option value="api">Api</option>
          <option value="created">Creadas</option>
        </select>
        <select className={styles.selectores} onChange={handleOpChange}>
          <option value="">Order By</option>
          <option value="alfAsc">A-Z</option>
          <option value="alfDesc">Z-A</option>
          <option value="weightMayor">+Weight</option>
          <option value="weightMenor">-Weight</option>
        </select>
      </div>
      <div className={styles.sContainer}>
        <div>
          <button className={styles.bt} onClick={handleClick}>
            Reload
          </button>
        </div>
      </div>
    </div>
  );
};
