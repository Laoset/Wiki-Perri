import React, { useEffect, useState } from "react";
//Para volver
import { Link, useParams } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { searchIdDog } from "../../reduxActions/actions";
import styles from "./Detail.module.css";

const Detail = () => {
  //Loader
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  //ESTADO Y MONTAJE
  const doges = useSelector((state) => state.detail);
  // const dogi = useSelector((state) => state.dogs);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    dispatch(searchIdDog(id));
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
                  {!doges[0].createInDb
                    ? doges[0].temperament
                    : doges[0].temperament.map((el) => el.name + " ")}
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
