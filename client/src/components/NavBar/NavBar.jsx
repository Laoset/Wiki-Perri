import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sContainer}>
        <Link to="/create">
          <button className={styles.bt}>Create Dog</button>
        </Link>
        <h1 className={styles.title}>WIKI PERRI</h1>
        <Link to="/about">
          <button className={styles.bt}>About me</button>
        </Link>
      </div>
    </div>
  );
};
export default NavBar;
