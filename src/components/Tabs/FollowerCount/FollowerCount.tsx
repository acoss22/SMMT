import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFollowerCount } from '../../../store/reducer';
import { RootState } from '../../../store/store';
import styles from './followercount.module.scss';

const FollowerCount: React.FC = () => {
  const dispatch = useDispatch();

  // Access the followers and lastUpdated properties from the tabReducer state
  const followers = useSelector((state: RootState) => state.followers);
  const lastUpdated = useSelector((state: RootState) => state.lastUpdated);

  useEffect(() => {
    // Dispatch the action to initialize followers (if needed)
    dispatch(updateFollowerCount({ platform: 'Facebook', count: followers.Facebook }));
    dispatch(updateFollowerCount({ platform: 'Instagram', count: followers.Instagram }));
    // ... repeat for other platforms
  }, [dispatch, followers]);

  const handleFollowerChange = (platform: string, value: number) => {
    // Dispatch the action to update follower count
    dispatch(updateFollowerCount({ platform, count: value }));
  };

  return (
    <div className={styles['tab2-content']}>
      <h2>Follower Count</h2>
      <div className={styles['social-list']}>
        {Object.keys(followers).map(platform => (
          <div key={platform} className={styles['social-item']}>
            <h3>{platform}</h3>
            <p className={styles['input-container']}>
              <input
                className={styles['input-checkbox']}
                type="number"
                value={followers[platform]}
                onChange={e => handleFollowerChange(platform, parseInt(e.target.value))}
              />
              Followers
            </p>
          </div>
        ))}
      </div>
      <p>Last updated at {lastUpdated}</p>
    </div>
  );
};

export default FollowerCount;
