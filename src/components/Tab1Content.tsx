import React from 'react';
import styles from './tabcontent.module.scss';


const Tab1Content: React.FC = () => {
  return (
    <div className={styles['social-list']}>
      <div className={styles['social-item']}>
        <h3>Facebook</h3>
        <p>5 Followers</p>
      </div>
      <div className={styles['social-item']}>
        <h3>Instagram</h3>
        <p>Followers Count</p>
      </div>
      {/* Add more social items as needed */}
    </div>
  );
};

export default Tab1Content;
