import React, { useState } from "react";
import styles from './signupform.module.scss';

interface SignUpFormProps {
  onSignUp: (email: string, password: string, preferredUsername: string) => void;
  onSwitchToLogin: () => void; // New prop to handle switching to login form
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredUsername, setPreferredUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(email, password, preferredUsername);
  };

  return (
    <div className={`${styles["center-text"]} ${styles["form-container"]}`}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="preferredUsername">Preferred Username:</label>
          <input
            type="text"
            id="preferredUsername"
            value={preferredUsername}
            onChange={(e) => setPreferredUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Sign Up</button>
      </form>
      <p className={styles["switch-link"]}>
        Already have an account? <a href="#" onClick={onSwitchToLogin}>Log in</a>
      </p>
    </div>
  );
};

export default SignUpForm;
