import React, { useState } from 'react';
import styles from './followercount.module.scss';

type SocialMediaFollowers = {
  [platform: string]: number;
};

const initialFollowers: SocialMediaFollowers = {
  Facebook: 5,
  Instagram: 10,
  Youtube: 5,
  Linkedin: 15,
  Twitter: 15,
  Twitch: 15,
};

const FollowerCount: React.FC = () => {
  const [followers, setFollowers] = useState<SocialMediaFollowers>(initialFollowers);

  const handleFollowerChange = (platform: string, value: number) => {
    setFollowers(prevFollowers => ({
      ...prevFollowers,
      [platform]: value,
    }));
  };

  return (
    <>
      <div className={styles['tab2-content']}>
        <h2>Follower Count</h2>
   
      <div className={styles['social-list']}>
        {Object.keys(followers).map(platform => (
          <div key={platform} className={styles['social-item']}>
            <h3>{platform}</h3>
            <p>
              <input
                type="number"
                value={followers[platform]}
                onChange={e => handleFollowerChange(platform, parseInt(e.target.value))}
              />
              Followers
            </p>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default FollowerCount;
