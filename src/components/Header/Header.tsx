import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <h1>EventRight</h1>
      <div className="header-signin">
        <p>
          <a href="#" className="signin-link">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Header;
