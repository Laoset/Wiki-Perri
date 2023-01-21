import React from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";
const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerAbout}>
        <div className={styles.containerName}>
          <h1 className={styles.h1Mi}>
            Kevin<span className={styles.spanMi}>Corman</span>
          </h1>
        </div>
        <h3 className={styles.h3Mi}>
          Actualmente cursando el Bootcamp FullStack de Henry. Esta web, es
          parte del Bootcamp y es llamado{" "}
          <span className={styles.spansito}>Proyecto Individual</span>, tiene el
          objetivo de crearlo desde 0, trabajando base de datos, Back end y
          Front End. Debe cumplir los siguientes requisitos, en base a la
          tematica propuesta:
          <div className={styles.req}>
            <li className={styles.li}>Buscar perros</li>
            <li className={styles.li}>Filtrarlos / Ordenarlos</li>
            <li className={styles.li}>Agregar nuevos perros</li>
          </div>
        </h3>
        <div className={styles.liContainer}>
          <h2 className={styles.h2Li}>Lo utilizado :</h2>
          <li className={styles.li}>CSS modules</li>
          <li className={styles.li}>Javascript</li>
          <li className={styles.li}>React</li>
          <li className={styles.li}>Redux</li>
          <li className={styles.li}>Express</li>
          <li className={styles.li}>PostgreSQL</li>
        </div>
        <div className={styles.containerBt}>
          <Link to="/home">
            <button className={styles.bt}>Volver</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
