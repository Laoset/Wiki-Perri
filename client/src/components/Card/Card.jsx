import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteDog, getRazas } from "../../reduxActions/actions";
import styles from "./Card.module.css";

const Card = ({ id, name, image, temperament, weight, createInDb }) => {
  //Para borrar al perro
  const dispatch = useDispatch();
  const deleteRaza = (e) => {
    e.preventDefault();
    dispatch(deleteDog(id));
    dispatch(getRazas());
  };
  return (
    <div className={styles.container}>
      <div className={styles.tarjetas}>
        <div className={styles.tarjetasDentro}>
          <div className={styles.imgContainer}>
            <img src={image} alt="noImg" className={styles.img} />
          </div>
          <div className={styles.infoContainer}>
            <Link className={styles.link} to={"/detail/" + id}>
              <h3 className={styles.name}>{name}</h3>
            </Link>
            <h2 className={styles.weight}>Weight: {weight} kg</h2>
            <h2 className={styles.temperament}>
              {createInDb ? temperament.join(", ") : temperament}
            </h2>
            {createInDb ? (
              <button
                type="button"
                className={styles.delete}
                onClick={(e) => deleteRaza(e)}
              >
                X
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
