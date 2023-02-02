import React, { useEffect, useState } from "react";
//Para volver
import { Link, useParams } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getRazas, searchIdDog } from "../../reduxActions/actions";
import styles from "./Detail.module.css";

const Detail = () => {
  //Loader
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  //Id que capturo del URL
  const { id } = useParams();
  console.log(id);
  //Me traigo el estado DETAIL, que contiene info de mi DOG ya ubicado
  const doges = useSelector((state) => state.detail);
  console.log(doges);
  //Cuando se monta mi componente , cargo el Loader y hago la accion del searchIdDog
  useEffect(() => {
    dispatch(getRazas());
    dispatch(searchIdDog(id));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <div className={styles.padreLoader}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <div className={styles.containerPadre}>
          <div className={styles.containerDetail}>
            <div className={styles.containerImg}>
              <img
                className={styles.image}
                src={doges[0].image}
                alt={doges[0].name}
              />
            </div>
            <div className={styles.containerText}>
              <h1 className={styles.title}>{doges[0].name}</h1>
              <h3 className={styles.h3tempera}>
                Height<p className={styles.p}>{doges[0].height} cm</p>
              </h3>
              <h3 className={styles.h3tempera}>
                Weight
                <p className={styles.p}>{doges[0].weight} kg</p>
              </h3>
              <h3 className={styles.h3tempera}>
                Life span
                <p className={styles.p}>{doges[0].life_span}</p>
              </h3>

              <h3 className={styles.h3tempera}>
                Temperaments
                <p className={styles.temperamentos}>
                  {
                    doges[0].createInDb // Si es de la API
                      ? doges[0].temperament.join(", ") // hago esto
                      : doges[0].temperament //Si no hago esto
                  }
                </p>
              </h3>
            </div>
          </div>
          <Link to="/home">
            <button className={styles.bt}>BACK</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Detail;
