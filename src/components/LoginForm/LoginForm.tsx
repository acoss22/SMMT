import React, { useState } from "react";
import styles from "./loginform.module.scss";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  onSwitchToSignUp: () => void; // Add this prop for switching to the sign-up form
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className={styles["center-text"]}>
      <h2>Login</h2>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
        <p className={styles["center-text"]}>
          Don't have an account?{" "}
          <a href="#" onClick={onSwitchToSignUp}>
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
