import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

const App: React.FC = () => {
  return (
    <div>
      <Header title="Social Media Management Tool" /> {/* Use the Header component */}
      <Main>
        {/* Your main content goes here */}
        <p>This is the main content of the app.</p>
      </Main> {/* Use the Main component */}
      <Footer copyright="2023 MyCompany" /> {/* Use the Footer component */}
    </div>
  );
};

export default App;
