import React, { useState } from 'react';
import './styles.scss'; // Import the SCSS file
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import FollowerCount from './components/Tabs/FollowerCount/FollowerCount';
import Tab from './components/Tabs/Tab';
import Tasks from './components/Tabs/Tasks/DailyTasks';


const App: React.FC = () => {
  const tabs = ['Followers', 'Tasks'];
  const [activeTab, setActiveTab] = useState(0);
  const [postTweetDaily, setPostTweetDaily] = useState(false);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <Header title="Social Media Management Tool" />
      <div className="main-container">
        <Tab tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick}>
          <div>
            <FollowerCount />
          </div>
          <div>
            <Tasks postTweetDaily={postTweetDaily} setPostTweetDaily={setPostTweetDaily} />
          </div>
        </Tab>
      </div>
      <Footer copyright="2023 Ana Sequeira" />
    </div>
  );
};

export default App;
