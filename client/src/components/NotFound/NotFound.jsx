import React from "react";
import styles from "./NotFound.module.css";
const NotFound = () => {
  return (
    <div className={styles.padreContainer}>
      <div className={styles.hijoContainer}>
        <div className={styles.containerText}>
          <h1 className={styles.h1}>404</h1>
          <h1 className={styles.h1}>Not Found</h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
