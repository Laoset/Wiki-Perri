import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../reduxActions/actions";
//STYLE
import styles from "./PerroForm.module.css";
const validador = (info) => {
  //variable donde guardo mis errores
  let errors = {};
  if (!info.name) {
    errors.name = "Se requiere un nombre";
  }
  if (!info.height) {
    errors.height = "Se requiere altura";
  }
  if (!info.weight) {
    errors.weight = "Se requiere peso";
  }
  if (!info.life_span) {
    errors.life_span = "Se requiere expectativa de vida";
  }
  return errors;
};
const PerroForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tempera = useSelector((state) => state.temperaments);
  //Estado para mis errores
  const [error, setError] = useState({});
  //Estado donde guarde mi FORMULARIO con los datos del dog
  const [info, setInfo] = useState({
    name: "",
    height: "",
    weightmin: "",
    weightmax: "",
    life_span: "",
    image: "",
    temperaments: [],
    weight: [],
  });
  //BORRAR TEMPERAMENTOS
  const handleDeleteTemp = (el) => {
    el.preventDefault();
    setInfo({
      ...info,
      temperaments: info.temperaments.filter((e) => e !== el),
    });
  };
  //PARA MIS INPUTS
  const handleChange = (evento) => {
    evento.preventDefault();
    setInfo({
      ...info,
      //lo de abajo hace referencia a todos los atributos NAMES que tienen mis elementos renderizados, osea los que se van modifcando
      [evento.target.name]: evento.target.value,
    });
    console.log(info);

    //La parte validadora
    setError(
      validador({
        ...info,
        [evento.target.name]: evento.target.value,
      })
    );
  };
  //PARA MIS TEMPERAMENTOS
  const handleTemp = (evento) => {
    setInfo({
      ...info,
      temperaments: [...info.temperaments, evento.target.value],
    });
  };
  //SUBMIT DE FORMULARIO CON DATOS COMPLETADOS
  const handleSubmit = (evento) => {
    evento.preventDefault();
    const suma = info.weightmin.concat(info.weightmax);
    info.weight.push(suma);
    dispatch(postDog(info));
    history.push("/home");
    console.log(info);
  };
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crea tu Perro</h1>
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <label className={styles.labels}>Name :</label>
          <input
            type="text"
            value={info.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {error.name && <p className={styles.errors}>{error.name}</p>}
          <label className={styles.labels}>Height :</label>
          <input
            type="text"
            value={info.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
          {error.height && <p className={styles.errors}>{error.height}</p>}

          <label className={styles.labels}>Weight :</label>
          <input
            type="text"
            value={info.weightmin}
            name="weightmin"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            value={info.weightmax}
            name="weightmax"
            onChange={(e) => handleChange(e)}
          />
          {error.weight && <p className={styles.errors}>{error.weight}</p>}
          <label className={styles.labels}>Life span :</label>
          <input
            type="text"
            value={info.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          />
          {error.life_span && (
            <p className={styles.errors}>{error.life_span}</p>
          )}

          <label className={styles.labels}>Image :</label>
          <input
            name="image"
            value={info.image}
            type="text"
            onChange={(e) => handleChange(e)}
          />
          <select
            required
            onChange={(e) => handleTemp(e)}
            className={styles.select}
          >
            <option>Temperaments</option>
            {tempera?.map((t) => {
              return (
                <option value={t.name} key={t.id}>
                  {t.name}
                </option>
              );
            })}
          </select>
          <div className={styles.contenedorTemp}>
            {info.temperaments?.map((t, index) => (
              <div key={index} className={styles.te}>
                <p className={styles.pTemp}>{t}</p>
                <button
                  onClick={() => handleDeleteTemp(t)}
                  className={styles.btTemp}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <input
            onClick={(e) => handleSubmit(e)}
            className={styles.submit}
            type="submit"
            value="Create"
          />
        </div>
        <div className={styles.sideImg}></div>
      </form>
      <Link to="/home">
        <button className={styles.bt}>Volver</button>
      </Link>
    </div>
  );
};
export default PerroForm;
