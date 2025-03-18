import "./Header.css";
import { IoLogInOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1>EventRight</h1>
      <div className="header-signin">
        <p>
          <Link to="/login" className="signin-link">
            <IoLogInOutline className="icon" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Header;
