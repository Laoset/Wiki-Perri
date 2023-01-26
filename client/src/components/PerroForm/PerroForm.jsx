import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { getRazas, getTemperaments, postDog } from "../../reduxActions/actions";
//STYLE
import styles from "./PerroForm.module.css";

const PerroForm = () => {
  //Loader
  const [loading, setLoading] = useState(false);
  //Validador
  const validador = (info) => {
    //variable donde guardo mis errores
    let errors = {};
    if (!info.name) {
      errors.name = "Se requiere un nombre";
    }
    if (info.heightmin <= 0) {
      errors.heightmin = "El minimo es 15 cm";
    }
    if (info.heightmax > 90) {
      errors.heightmax = "El maximo es 90cm";
    }
    if (!info.heightmin || !info.heightmax) {
      errors.height = "Se requiere altura";
    }
    if (!info.weightmin || !info.weightmax) {
      errors.weight = "Se requiere peso";
    }
    if (!info.life_span) {
      errors.life_span = "Se requiere expectativa de vida";
    }
    return errors;
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const tempera = useSelector((state) => state.temperaments);
  //Estado para mis errores
  const [error, setError] = useState({});
  //Estado donde guarde mi FORMULARIO con los datos del dog
  const [info, setInfo] = useState({
    name: "",
    heightmin: "",
    heightmax: "",
    weightmin: "",
    weightmax: "",
    life_span: "",
    image: "",
    temperaments: [],
    weight: [],
    height: [],
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
    //Uno ambos weight para mandarlos como unica cadena a la propiedad weight
    const sumaWeight = info.weightmin.concat(` - ${info.weightmax}`);
    info.weight.push(sumaWeight);
    //Lo mismo pero en HEIGHT
    const sumaHeight = info.heightmin.concat(` - ${info.heightmax}`);
    info.height.push(sumaHeight);
    //Temp?
    info.temperaments = info.temperaments.join(",").split(",");

    //Condicional de submit
    if (error.length === undefined || info.name === String) {
      dispatch(postDog(info));
      alert("Creado exitosamente");
      history.push("/home");
      dispatch(getRazas());
      console.log(info);
    } else {
      alert("Te falta completar informacion");
    }
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    dispatch(getTemperaments());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <div className={styles.padreLoader}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.title}>Crea tu Perro</h1>
          <form className={styles.form}>
            <div className={styles.inputContainer}>
              {/* NAME SECTION */}
              <label className={styles.labels}>Name</label>
              <input
                autoComplete="off"
                className={styles.inputs}
                type="text"
                value={info.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {error.name && <p className={styles.errors}>{error.name}</p>}
              {/* HEIGHT SECTION */}
              <label className={styles.labels}>Height</label>
              <input
                autoComplete="off"
                className={styles.weightmin}
                type="text"
                value={info.heightmin}
                name="heightmin"
                onChange={(e) => handleChange(e)}
                placeholder="Min"
              />
              {error.heightmin && (
                <p className={styles.errors}>{error.heightmin}</p>
              )}
              <input
                autoComplete="off"
                className={styles.inputs}
                type="text"
                value={info.heightmax}
                name="heightmax"
                onChange={(e) => handleChange(e)}
                placeholder="Max"
              />
              {error.heightmax && (
                <p className={styles.errors}>{error.heightmax}</p>
              )}

              {error.height && <p className={styles.errors}>{error.height}</p>}
              {/* WEIGHT SECTION */}
              <label className={styles.labels}>Weight</label>
              <input
                autoComplete="off"
                className={styles.weightmin}
                type="text"
                value={info.weightmin}
                name="weightmin"
                onChange={(e) => handleChange(e)}
                placeholder="Min"
              />
              <input
                autoComplete="off"
                className={styles.inputs}
                type="text"
                value={info.weightmax}
                name="weightmax"
                onChange={(e) => handleChange(e)}
                placeholder="Max"
              />
              {error.weight && <p className={styles.errors}>{error.weight}</p>}
              {/* LIFE SPAN SECTION */}
              <label className={styles.labels}>Life span</label>
              <input
                autoComplete="off"
                className={styles.inputs}
                type="text"
                value={info.life_span}
                name="life_span"
                onChange={(e) => handleChange(e)}
              />
              {error.life_span && (
                <p className={styles.errors}>{error.life_span}</p>
              )}
              {/* IMAGE SECTION */}
              <label className={styles.labels}>Image</label>
              <input
                autoComplete="off"
                className={styles.inputs}
                name="image"
                value={info.image}
                type="text"
                onChange={(e) => handleChange(e)}
              />
              {/* TEMPERAMENT SECTION */}
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
      )}
    </>
  );
};
export default PerroForm;
