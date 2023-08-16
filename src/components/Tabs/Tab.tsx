import React, { ReactNode, useState } from 'react';
import styles from './tab.module.scss';

interface TabProps {
  tabs: string[];
  activeTab: number; // Add activeTab prop
  handleTabClick: (index: number) => void; // Add handleTabClick prop
  children: ReactNode;
}

const Tab: React.FC<TabProps> = ({ tabs, activeTab, handleTabClick, children }) => {
  return (
    <div className={styles['tab-container']}>
      <div className={styles['tab-buttons']}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles['tab-button']} ${index === activeTab ? styles['active'] : ''}`}
            onClick={() => handleTabClick(index)}
          >
           <h2>{tab}</h2> 
          </button>
        ))}
      </div>
      <div className={styles['tab-content']}>
        {children}
      </div>
    </div>
  );
};

export default Tab;
