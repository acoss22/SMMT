import React, { lazy, Suspense, useEffect, useState } from "react";
import { Provider } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import AWS from "aws-sdk"; // Import AWS SDK
import styles from "./app.module.scss";
import "./styles.scss";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";

const Tab = lazy(() => import("./components/Tabs/Tab"));

const App: React.FC = () => {
  const tabs: string[] = ["Followers", "Tasks", "Activity", "Analytics"];
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  useEffect(() => {
    // Set AWS credentials
    AWS.config.update({
      region: "us-east-1", // Replace with your AWS region
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "us-east-1_JDRkJzrpM", // Set your Cognito Identity Pool ID
      }),
    });

    // Check if a user is already logged in
    const credentials = AWS.config.credentials as AWS.Credentials;
    credentials.get((err) => {
      if (!err) {
        setIsLoggedIn(true);
        // You might want to update your app state to reflect the user's login status
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      // Sign in the user using Cognito or your authentication method
      // Update the logic to fit your authentication flow
      // If successful, set isLoggedIn to true
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
      // Sign up the user using Cognito or your authentication method
      // Update the logic to fit your authentication flow
      // If successful, set isLoggedIn to true
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Sign Up error:", error);
      // Handle sign up error (e.g., display error message to the user)
    }
  };

  if (isLoggedIn === undefined) {
    // Loading state while determining login status
    return <div>Loading...</div>;
  }

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
                  {showSignUp && <SignUpForm onSwitchToLogin={handleSwitchToLogin} onSignUp={handleSignUp} />}
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
