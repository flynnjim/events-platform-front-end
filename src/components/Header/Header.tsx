import "./Header.css";
import { IoLogInOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="header">
      <h1>EventRight</h1>
      <div className="header-signin">
        <p>
          <a href="#" className="signin-link">
            <IoLogInOutline className="icon" />
          </a>
        </p>
      </div>
    </div>
  );
};

export default Header;
