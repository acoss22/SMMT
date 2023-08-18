import React, { lazy, Suspense, useState } from "react";
import { Provider } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import AWS from "aws-sdk"; // Import AWS SDK
import { Auth } from 'aws-amplify';
import styles from "./app.module.scss";
import "./styles.scss";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";

const Tab = lazy(() => import("./components/Tabs/Tab"));

const App: React.FC = () => {
  const tabs: string[] = ["Followers", "Tasks", "Activity", "Analytics"];
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Start with not logged in
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      // Sign in the user using Cognito or your authentication method
      // Update the logic to fit your authentication flow
      // If successful, set isLoggedIn to true
      // Now update the AWS credentials with the Identity Pool ID
      AWS.config.update({
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: "us-east-1_JDRkJzrpM", // Set your Cognito Identity Pool ID
        }),
      });
  
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error (e.g., display error message to the user)
    }
  };

  const handleSwitchToSignUp = () => {
    setShowSignUp(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignUp(false);
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      await Auth.signUp({
        username: email,
        password: password,
        // You can provide additional attributes here if needed
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Sign Up error:", error);
      // Handle sign up error (e.g., display error message to the user)
    }
  };

  return (
    <div className={styles.main}>
      <Header title="Social Media Management Tool" />
      <Provider store={store}>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            {isLoggedIn ? (
              <Tab tabs={tabs} />
            ) : (
              <div>
                <div>
                  {!showSignUp && (
                    <LoginForm
                      onLogin={handleLogin}
                      onSwitchToSignUp={handleSwitchToSignUp}
                    />
                  )}
                  {showSignUp && (
                    <SignUpForm
                      onSwitchToLogin={handleSwitchToLogin}
                      onSignUp={handleSignUp}
                    />
                  )}
                </div>
              </div>
            )}
          </Suspense>
        </div>
      </Provider>
      <Footer copyright="2023 Ana Sequeira" />
    </div>
  );
};

export default App;
