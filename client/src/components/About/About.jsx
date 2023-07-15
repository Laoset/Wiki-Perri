import React from "react";
//Para volver al home
import { Link } from "react-router-dom";
//Estilo
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
          This page is part of the
          <span className={styles.spansito}>'soyHenry'</span> bootcamp course,
          which consists of making a complete web page, database, backend and
          frontend. It must meet the following requirements:
          <div className={styles.req}>
            <li className={styles.li}>Search for dogs</li>
            <li className={styles.li}>Filter / Sort them</li>
            <li className={styles.li}>Add new dogs</li>
          </div>
        </h3>
        <div className={styles.liContainer}>
          <h2 className={styles.h2Li}>Used :</h2>
          <li className={styles.li}>CSS modules</li>
          <li className={styles.li}>Javascript</li>
          <li className={styles.li}>React</li>
          <li className={styles.li}>Redux</li>
          <li className={styles.li}>Express</li>
          <li className={styles.li}>PostgreSQL</li>
        </div>
        <div className={styles.containerBt}>
          <Link to="/home">
            <button className={styles.bt}>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
