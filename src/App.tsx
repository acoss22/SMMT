import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main';
import Tab from './components/Tab';
import Tab1Content from './components/Tab1Content';
import './styles.scss'; // Import the SCSS file

const App: React.FC = () => {
    const tabs = ['Followers', 'Tasks'];

  return (
    <div>
      <Header title="Social Media Management Tool" /> {/* Use the Header component */}
      <Main>
        {/* Your main content goes here */}
       <h1>Tab Example</h1>
       <Tab tabs={tabs}>
        <Tab1Content /> {/* Pass Tab1Content as a child */}
      </Tab>
      </Main> {/* Use the Main component */}
      <Footer copyright="2023 Ana Sequeira" /> {/* Use the Footer component */}
    </div>
  );
};

export default App;
