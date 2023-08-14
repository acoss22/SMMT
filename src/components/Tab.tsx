import React, { useState, ReactNode } from 'react';
import styles from './tab.module.scss'; // Import the CSS module

interface TabProps {
  tabs: string[];
  children: ReactNode;
}

const Tab: React.FC<TabProps> = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={styles['tab-container']}>
      <div className={styles['tab-buttons']}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles['tab-button']} ${index === activeTab ? styles['active'] : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles['tab-content']}>
        {React.Children.toArray(children)[activeTab]} {/* Render the child based on activeTab */}
      </div>
    </div>
  );
};

export default Tab;
