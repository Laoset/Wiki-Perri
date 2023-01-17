import React from "react";
import styles from "./Card.module.css";

const Card = ({ name, image, temperament, weight }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tarjetas}>
        <div className={styles.tarjetasDentro}>
          <img src={image} alt="ggwp" className={styles.img} />
          <div className={styles.infoContainer}>
            <h3 className={styles.name}>{name}</h3>
            <h2 className={styles.temperament}>{temperament}</h2>
            <h2 className={styles.weight}>Weight: {weight} kg</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
