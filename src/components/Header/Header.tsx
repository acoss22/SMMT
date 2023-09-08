import React from "react";
import styles from "./header.module.scss";

interface HeaderProps {
  title: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  username: string | null;
}

const Header: React.FC<HeaderProps> = ({
  title,
  isLoggedIn,
  onLogout,
  username,
}) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      {isLoggedIn && (
        <>
          <div className="userActionsContainer">
            <span>Hello {username}</span>
          </div>
          <button className={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
