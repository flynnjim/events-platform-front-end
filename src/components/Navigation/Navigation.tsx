import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="navigation-header">
      <nav className="navigation">
        <ul className="navigation-menu">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/map">Map View</Link>
          </li>
          <li>
            <Link to="/add-event">Add Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
