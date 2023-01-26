import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ id, name, image, temperament, weight, createInDb }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tarjetas}>
        <div className={styles.tarjetasDentro}>
          <img src={image} alt="ggwp" className={styles.img} />
          <div className={styles.infoContainer}>
            <Link className={styles.link} to={"/detail/" + id}>
              <h3 className={styles.name}>{name}</h3>
            </Link>
            <h2 className={styles.weight}>Weight: {weight} kg</h2>
            <h2 className={styles.temperament}>
              {createInDb ? temperament.join() : temperament}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
