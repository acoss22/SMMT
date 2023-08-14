import React, { useState } from 'react';
import './styles.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import FollowerCount from './components/Tabs/FollowerCount/FollowerCount';
import Tab from './components/Tabs/Tab';
import Tasks from './components/Tabs/Tasks/DailyTasks';

const App: React.FC = () => {
  const tabs = ['Followers', 'Tasks'];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const [postTweetDaily, setPostTweetDaily] = useState(false); // State for Tasks component

  return (
    <div>
      <Header title="Social Media Management Tool" />
      <Tab tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick}>
        <div>
          {activeTab === 0 && <FollowerCount />}
          {activeTab === 1 && (
            <Tasks postTweetDaily={postTweetDaily} setPostTweetDaily={setPostTweetDaily} />
          )}
        </div>
      </Tab>
      <Footer copyright="2023 Ana Sequeira" />
    </div>
  );
};

export default App;
