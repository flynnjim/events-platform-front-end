import "./Navigation.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContex";

const Navigation = () => {
  const { isStaff } = useAuth();

  return (
    <header className="navigation-header">
      <nav className="navigation">
        <ul className="navigation-menu">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {/* <li>
            <Link to="/map">Map View</Link>
          </li> */}
          <li>
            <Link to="/events/tech">Tech</Link>
          </li>
          <li>
            <Link to="/events/sport">Sport</Link>
          </li>
          <li>
            <Link to="/events/culture">Culture</Link>
          </li>
          {isStaff && (
            <li>
              <Link to="/add-event">Add Event</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
