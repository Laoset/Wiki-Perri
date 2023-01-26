import React from "react";
import { Link } from "react-router-dom";
//Css
import styles from "./LadingPage.module.css";
const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Welcome to Wiki Perri</h1>
        <Link to="/home">
          <button className={styles.bt}>ENTER</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
