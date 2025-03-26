import React from "react";
import { Link } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link to="/" className={styles.brandLink}>
          <h1 className={styles.title}>EventRight</h1>
          <p className={styles.tagline}>Connecting Moments &amp; Memories</p>
        </Link>
      </div>
      <div className={styles.auth}>
        <Link to="/login" className={styles.authLink}>
          <IoLogInOutline className={styles.icon} />
          <span className={styles.authText}>Sign In</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
