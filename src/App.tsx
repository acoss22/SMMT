import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header/Header';
import Tab from './components/Tabs/Tab';
import Footer from './components/Footer/Footer';
import store from './store/store'; // Import the store

const App: React.FC = () => {
  const tabs: string[] = ['Followers', 'Tasks', 'Activity'];

  return (
    <Provider store={store}>
      <div>
        <Header title="Social Media Management Tool" />
        <Tab tabs={tabs} />
        <Footer copyright="2023 Ana Sequeira" />
      </div>
    </Provider>
  );
};

export default App;
