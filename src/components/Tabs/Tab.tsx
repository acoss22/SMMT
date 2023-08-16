import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../../store/reducer';

import styles from './tab.module.scss';
import FollowerCount from './FollowerCount/FollowerCount';
import DailyTasks from './DailyTasks/DailyTasks';
import { RootState } from 'store/store';
import ActivityLogs from './ActivityLogs/ActivityLogs';

interface TabProps {
  tabs: string[];
}

const Tab: React.FC<TabProps> = ({ tabs }) => {
  const activeTab = useSelector((state: RootState) => state.activeTab);
  const dispatch = useDispatch();

  const handleTabClick = (index: number) => {
    dispatch(setActiveTab(index));
  };

  return (
    <div className={styles['tab-container']}>
      <div className={styles['tab-buttons']}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles['tab-button']} ${
              index === activeTab ? styles['active'] : ''
            }`}
            onClick={() => handleTabClick(index)}
          >
            <h2>{tab}</h2>
          </button>
        ))}
      </div>
      <div className={styles['tab-content']}>
        {/* Render content based on activeTab */}
        {activeTab === 0 && <FollowerCount />} 
        {activeTab === 1 && <DailyTasks />}
        {activeTab === 2 && <ActivityLogs />}
      </div>
    </div>
  );
};

export default Tab;
