import React from 'react';
import styles from './footer.module.scss';

interface FooterProps {
  copyright: string;
}

const Footer: React.FC<FooterProps> = ({ copyright }) => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {copyright}</p>
    </footer>
  );
};

export default Footer;
