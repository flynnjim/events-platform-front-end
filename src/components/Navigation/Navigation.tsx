import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContex";
import styles from "./Navigation.module.css";

const Navigation: React.FC = () => {
  const { isStaff } = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/events/tech" className={styles.link}>
              Tech
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/events/sport" className={styles.link}>
              Sport
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/events/culture" className={styles.link}>
              Culture
            </Link>
          </li>
          {isStaff && (
            <li className={styles.menuItem}>
              <Link to="/add-event" className={styles.link}>
                Add Event
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
