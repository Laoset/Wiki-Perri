import React, { useEffect } from "react";
//Para volver
import { Link, useParams } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { searchIdDog } from "../../reduxActions/actions";
import styles from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //ESTADO Y MONTAJE
  const doges = useSelector((state) => state.detail);
  // const dogi = useSelector((state) => state.dogs);
  useEffect(() => {
    dispatch(searchIdDog(id));
  }, [dispatch, id]);

  return (
    <div className={styles.containerPadre}>
      {doges.length > 0 ? (
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
            <h2 className={styles.h2}>{doges[0].height}</h2>
            <h2 className={styles.h2}>{doges[0].weight}</h2>
            <h3 className={styles.tempera}>
              Temperamentos :
              {!doges[0].createInDb
                ? doges[0].temperament
                : doges[0].temperament.map((el) => el.name + " ")}
            </h3>
          </div>
        </div>
      ) : (
        <p>LOADING</p>
      )}
      <Link to="/home">
        <button>VOLVER</button>
      </Link>
    </div>
  );
};

export default Detail;
