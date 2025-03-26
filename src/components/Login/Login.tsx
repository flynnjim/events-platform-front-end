import React, { useState } from "react";
import { loginUser, loginStaff } from "../../../api";
import { useAuth } from "../../contexts/AuthContex";
import styles from "./Login.module.css";

interface LoginResponseUser {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password_hash: string;
}

const Login: React.FC = () => {
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
    <div className={styles.container}>
      {!user ? <h1 className={styles.title}>Log In</h1> : null}
      {user ? (
        <div className={styles.loggedIn}>
          <p className={styles.welcome}>Welcome, {user.first_name}!</p>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="role" className={styles.label}>
                Select Role:
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as "staff" | "user")}
                className={styles.select}
              >
                <option value="user">User</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            {role === "user" ? (
              <div className={styles.field}>
                <label htmlFor="username" className={styles.label}>
                  Username:
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            ) : (
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your staff email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                Password:
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Log In
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
