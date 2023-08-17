import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header/Header';
import Footer from './components/Header/Footer/Footer';
import store from './store/store'; // Import the store

const Tab = lazy(() => import('./components/Tabs/Tab')); // Lazy load Tab component

const App: React.FC = () => {
  const tabs: string[] = ['Followers', 'Tasks', 'Activity'];

  return (
    <Provider store={store}>
      <div>
        <Header title="Social Media Management Tool" />
        <Suspense fallback={<div>Loading...</div>}>
          <Tab tabs={tabs} />
        </Suspense>
        <Footer copyright="2023 Ana Sequeira" />
      </div>
    </Provider>
  );
};

export default App;
