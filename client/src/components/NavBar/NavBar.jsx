import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logoImg from "../../util/perri.jpg";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>WIKI</h1>
        <img src={logoImg} alt="Logo" className={styles.img} />
        <h1 className={styles.title}>PERRI</h1>
      </div>
      <div className={styles.btContainer}>
        <Link to="/create">
          <button className={styles.bt}>Create Dog</button>
        </Link>
        <Link to="/about">
          <button className={styles.bt}>About me</button>
        </Link>
      </div>
    </div>
  );
};
export default NavBar;
