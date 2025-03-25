import { useState } from "react";
import "./Login.css";
import { loginUser, loginStaff } from "../../../api";
import { useAuth } from "../../contexts/AuthContex";

interface LoginResponseUser {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password_hash: string;
}

const Login = () => {
  const [role, setRole] = useState<"staff" | "user">("user");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, setUser, setIsStaff } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let userData: LoginResponseUser;
      if (role === "user") {
        userData = await loginUser(username, password);
        setIsStaff(false);
      } else {
        userData = await loginStaff(email, password);
        setIsStaff(true);
      }
      console.log("User logged in:", userData);
      setUser(userData);
      setError("");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "Failed to log in. Please check your credentials and try again."
      );
      setUser(null);
      setIsStaff(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsStaff(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="login-container">
      {!user && <h1>Login</h1>}
      {user ? (
        <div className="logged-in">
          <p>Welcome, {user.first_name}!</p>
          <button className="login-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Select Role:
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as "staff" | "user")}
              >
                <option value="user">User</option>
                <option value="staff">Staff</option>
              </select>
            </label>

            {role === "user" ? (
              <label>
                Username:
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            ) : (
              <label>
                Email:
                <input
                  type="email"
                  placeholder="Enter your staff email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            )}

            <label>
              Password:
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button className="login-button" type="submit">
              Log In
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default Login;
