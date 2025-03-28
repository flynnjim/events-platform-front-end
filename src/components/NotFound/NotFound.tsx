import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className={styles.homeLink}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
