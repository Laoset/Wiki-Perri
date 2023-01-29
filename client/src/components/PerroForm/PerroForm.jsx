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
    //Variables regex
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    const numberRegex = /^[0-9]*$/;
    //variable donde guardo mis errores
    let errors = {};
    //NAME
    if (!info.name) {
      //Si el nombre esta vacio
      errors.name = "A name is required";
    } else if (!nameRegex.test(info.name)) {
      //Si no esta vacio, debe cumplir esa variable regex
      errors.name = "Only letters and spaces are allowed in the name";
    }
    //ALTURA
    if (
      !numberRegex.test(info.heightmin) ||
      !numberRegex.test(info.heightmax)
    ) {
      //Si la altura no coincide
      errors.height = "Only number";
    }
    if (info.heightmin <= 14) {
      errors.heightmin = "Minimum height 15cm";
    }
    if (info.heightmax > 90) {
      errors.heightmax = "Maximum height 90cm";
    }
    if (parseInt(info.heightmax) < parseInt(info.heightmin)) {
      errors.heightmax = "Cannot be less than the minimum";
    }
    if (!info.heightmin || !info.heightmax) {
      errors.height = "Height required";
    }
    //PESO
    if (
      !numberRegex.test(info.weightmin) ||
      !numberRegex.test(info.weightmax)
    ) {
      //Si el peso no coincide
      errors.weight = "Only number";
    }
    if (info.weightmin <= 1) {
      errors.weightmin = "Minimum weight 2kg";
    }
    if (info.weightmax > 120) {
      errors.weightmax = "Maximum weight 120kg";
    }
    if (parseInt(info.weightmax) < parseInt(info.weightmin)) {
      errors.weightmax = "Cannot be less than the minimum";
    }
    if (!info.weightmin || !info.weightmax) {
      errors.weight = "Weight required";
    }

    //ESPERANZA DE VIDA
    if (info.life_span.length > 1) {
      if (info.life_span > 30) {
        errors.life_span = "Maximum 30 years";
      }
      if (info.life_span <= 0) {
        errors.life_span = "Minimum  1 years";
      }
    }
    //IMAGEN
    if (info.image.length >= 1) {
      if (info.image <= 0 || info.image >= 0) {
        errors.image = "The image should not be numbers";
      }
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
  const handleDeleteTemp = (t) => {
    setInfo({
      ...info,
      temperaments: info.temperaments.filter((e) => e !== t),
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
    //Condicional de submit
    if (Object.keys(error).length === 0 && info.name) {
      //Uno ambos weight para mandarlos como unica cadena a la propiedad weight
      const sumaWeight = info.weightmin.concat(` - ${info.weightmax}`);
      info.weight.push(sumaWeight);
      //Lo mismo pero en HEIGHT
      const sumaHeight = info.heightmin.concat(` - ${info.heightmax}`);
      info.height.push(sumaHeight);
      // //Temp?
      // info.temperaments = info.temperaments.join(",").split(",");
      dispatch(postDog(info));
      alert("Successfully created");
      history.push("/home");
      //Luego de llegar a home hago un refresh mediante el getRazas, asi me muestra el perro nuevo
      dispatch(getRazas());
      console.log(info);
    } else {
      alert("You have missing or incorrect information");
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
          <h1 className={styles.title2}>Create your breed</h1>
          <form className={styles.form}>
            <div className={styles.inputContainer}>
              {/* NAME SECTION */}
              <label className={styles.title}>Name</label>
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
              {error.weightmin && (
                <p className={styles.errors}>{error.weightmin}</p>
              )}
              <input
                autoComplete="off"
                className={styles.inputs}
                type="text"
                value={info.weightmax}
                name="weightmax"
                onChange={(e) => handleChange(e)}
                placeholder="Max"
              />
              {error.weightmax && (
                <p className={styles.errors}>{error.weightmax}</p>
              )}

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
              {error.image && <p className={styles.errors}>{error.image}</p>}
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
                      type="button"
                      className={styles.btTemp}
                      onClick={() => handleDeleteTemp(t)}
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
            <button className={styles.bt}>Back</button>
          </Link>
        </div>
      )}
    </>
  );
};
export default PerroForm;
