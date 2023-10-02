import React from "react";
import styles from "./navbar.module.css";
function Navbar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar_container}>
        <h1>GeekTrust Admin UI Challange</h1>
      </div>
    </div>
  );
}

export default Navbar;
