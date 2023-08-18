import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import store from "./store/store"; // Import the store
import styles from './app.module.scss';
import './styles.scss';

const Tab = lazy(() => import("./components/Tabs/Tab")); // Lazy load Tab component

const App: React.FC = () => {
  const tabs: string[] = ["Followers", "Tasks", "Activity", "Analytics"];

  return (
    <div className={styles.main}>
      <Header title="Social Media Management Tool" />
      <Provider store={store}>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Tab tabs={tabs} />
          </Suspense>
        </div>
      </Provider>
      <Footer copyright="2023 Ana Sequeira" />
    </div>
  );
};

export default App;
