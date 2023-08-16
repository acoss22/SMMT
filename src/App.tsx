import React, { useState } from 'react';
import './styles.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import FollowerCount from './components/Tabs/FollowerCount/FollowerCount';
import Tab from './components/Tabs/Tab';
import Tasks from './components/Tabs/DailyTasks/DailyTasks';

const App: React.FC = () => {
  const tabs = ['Followers', 'Tasks'];
  const [activeTab, setActiveTab] = useState(0);
  const [postTweetDaily, setPostTweetDaily] = useState(false);
  const [postInstagramStoryDaily, setPostInstagramStoryDaily] = useState(false);
  
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tasks = [
    {
      id: 'tweet',
      description: 'Post 1 tweet daily',
      state: postTweetDaily,
      setState: setPostTweetDaily,
    },
    {
      id: 'instagramStory',
      description: 'Post 1 Instagram story daily',
      state: postInstagramStoryDaily,
      setState: setPostInstagramStoryDaily,
    },
    // Add more tasks here
  ];

  return (
    <div>
      <Header title="Social Media Management Tool" />
      <Tab tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick}>
        <div>
          {activeTab === 0 && <FollowerCount />}
          {activeTab === 1 && <Tasks tasks={tasks} />}
        </div>
      </Tab>
      <Footer copyright="2023 Ana Sequeira" />
    </div>
  );
};

export default App;
