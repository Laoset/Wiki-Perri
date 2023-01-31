import React, { useEffect } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
//Importo mi action
import {
  getRazas,
  filterByCreated,
  orderByAlf,
  orderByWeight,
  orderByHeight,
  filterByTemperament,
  getTemperaments,
  filterByAllDogs,
} from "../../reduxActions/actions";

export const Filtros = ({ setCurrentPage, setOrden, orden }) => {
  const dispatch = useDispatch();
  //Me traigo del estado mis temperamentos para poder mapear y hacer options
  let temps = useSelector((state) => state.temperaments);
  //Primer paso, SACO los espacios a los temperamentos que lo contienen y ELIMINO los repetidos
  let noSpace = [...new Set(temps.map((temp) => temp.name.trim()))];
  console.log(noSpace);
  //Segundo paso, ahora lo convierto en ARRAY de OBJ , sigo con el STRING VACIO
  let segundoPaso = noSpace.map((name) => {
    return temps.find((temp) => temp.name.trim() === name);
  });
  //Tercer paso, ELIMINO el string vacio , ahora solo 124 temps
  let tercerPaso = segundoPaso.filter((temp) => temp.name !== "");
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
    setOrden(`Ordenado ${evento.target.value}`);
  };

  //FUNCION QUE ABARCA MIS ORDENAMIENTOS
  const handleOpChange = (evento) => {
    const selectedOption = evento.target.value;
    if (selectedOption === "alfAsc") {
      dispatch(orderByAlf("asc"));
      //Seteo la pagina actual a 1
      setCurrentPage(1);
      //Modifica lo renderizado
      setOrden(`Orden ${evento.target.value}`);
    } else if (selectedOption === "alfDesc") {
      //Es mandarlo como la ultima opcion ya que no esta especificado el 'desc' en mi reducer
      dispatch(orderByAlf("desc"));
      //Seteo la pagina actual a 1
      setCurrentPage(1);
      //Modifica lo renderizado
      setOrden(`Orden ${evento.target.value}`);
    } else if (selectedOption === "weightMayor") {
      dispatch(orderByWeight("mayor"));
      //Seteo la pagina actual a 1
      setCurrentPage(1);
      //Modifica lo renderizado
      setOrden(`Orden ${evento.target.value}`);
    } else if (selectedOption === "weightMenor") {
      dispatch(orderByWeight("menor"));
      //Seteo la pagina actual a 1
      setCurrentPage(1);
      //Modifica lo renderizado
      setOrden(`Orden ${evento.target.value}`);
    } else if (selectedOption === "heightMayor") {
      //No existe el valor mayor en la action por lo cual toma el valor del 'else'
      dispatch(orderByHeight("mayor"));
      //Seteo la pagina actual a 1
      setCurrentPage(1);
      setOrden(`Orden ${evento.target.value}`);
    } else if (selectedOption === "heightMenor") {
      dispatch(orderByHeight("menor"));
      //Seteo la pagina actual a 1
      setCurrentPage(1);
      setOrden(`Orden ${evento.target.value}`);
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
          {tercerPaso?.map((t) => {
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
          <option value="heightMayor">+Height</option>
          <option value="heightMenor">-Height</option>
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
export default Filtros;
