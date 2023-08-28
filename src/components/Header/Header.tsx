import React from 'react';
import styles from './header.module.scss';

interface HeaderProps {
  title: string;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, isLoggedIn, onLogout }) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      {isLoggedIn && (
        <button className={styles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
