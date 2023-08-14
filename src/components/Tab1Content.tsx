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
        <p>10 Followers</p>
      </div>
      <div className={styles['social-item']}>
        <h3>Youtube</h3>
        <p>5 Followers</p>
      </div>
      <div className={styles['social-item']}>
        <h3>Linkedin</h3>
        <p>15 Followers</p>
      </div>
      <div className={styles['social-item']}>
        <h3>Twitter</h3>
        <p>15 Followers</p>
      </div>
      <div className={styles['social-item']}>
        <h3>Twitch</h3>
        <p>15 Followers</p>
      </div>
    </div>
  );
};

export default Tab1Content;
