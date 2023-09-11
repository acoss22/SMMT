import React, { lazy, Suspense, useEffect, useState } from "react";
import { Provider } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Auth, Amplify } from "aws-amplify"; // Import Amplify here
import awsconfig from "./aws-exports"; // Update the path if needed
import styles from "./app.module.scss";
import "./styles.scss";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import PasswordResetForm from "./components/PasswordResetForm/PasswordResetForm";

const Tab = lazy(() => import("./components/Tabs/Tab"));

Amplify.configure(awsconfig);

const App: React.FC = () => {
  const tabs: string[] = ["Followers", "Tasks", "Activity", "Analytics"];
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showResetPass, setShowResetPass] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeInputVisible, setVerificationCodeInputVisible] =
    useState(true);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [recoverPasswordMode, setRecoverPasswordMode] =
    useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);;
    
  const handleSwitchToSignUp = () => {
    setShowSignUp(true);
  };

  const handleSwitchToReset = () => {
    setShowResetPass(true);
    setRecoverPasswordMode(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignUp(false);
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      await Auth.signIn(username, password);
      setIsLoggedIn(true);
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.attributes.name);
      console.log(user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      const guestEmail = "guestsmmt@gmail.com";
      const guestPassword = "Iamguest1!";
      await Auth.signIn(guestEmail, guestPassword);
      setIsLoggedIn(true);
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.attributes.name);
    } catch (error) {
      console.error("Guest login error:", error);
    }
  };

  const handleResendVerificationCode = async () => {
    try {
      const email = verificationEmail;

      const reconstructedUsername = `${email}#${Math.floor(Date.now() / 1000)}`;

      console.log(
        "Resending verification code for username:",
        reconstructedUsername
      );

      await Auth.resendSignUp(reconstructedUsername);
    
    } catch (error) {
      console.error("Resend verification code error:", error);
    
    }
  };

  const handleVerification = async () => {
    try {
    
      await Auth.confirmSignUp(verificationEmail, verificationCode);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Verification error:", error);
   
    }
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
     
    }
  };

  const handleSignUp = async (
    username: string,
    password: string,
    email: string
  ) => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name: username,
          preferred_username: username,
        },
        validationData: [],
      });

      setShowSignUp(false);
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  const handleExitRecoverMode = () => {
    setRecoverPasswordMode(false);
  };

  return (
    <div className={styles.main}>
      <Header
        title="Social Media Management Tool"
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        username={username}
      />
      <Provider store={store}>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            {isLoggedIn ? (
              <Tab tabs={tabs} />
            ) : (
              <div>
                <div className={styles.emailForm}>
                  {!showSignUp && !recoverPasswordMode && (
                    <LoginForm
                      onLogin={handleLogin}
                      onSwitchToSignUp={handleSwitchToSignUp}
                      onSwitchToReset={handleSwitchToReset}
                    />
                  )}
                  {showSignUp && (
                    <SignUpForm
                      onSwitchToLogin={handleSwitchToLogin}
                      onSignUp={handleSignUp}
                    />
                  )}
                  {verificationCodeInputVisible && !recoverPasswordMode && (
                    <div className={styles.buttonContainer}>
                      <div className={styles.resendBlock}>
                        <div className={styles.verificationEmailBlock}>
                          <label
                            className={styles.resendLabel}
                            htmlFor="verificationEmailToResend"
                          >
                            Email to Verify:
                          </label>
                          <input
                            type="email"
                            id="verificationEmailToResend"
                            value={verificationEmail}
                            onChange={(e) =>
                              setVerificationEmail(e.target.value)
                            }
                            className={styles.resendEmailInput}
                          />
                          <button
                            className={styles.verifyButton}
                            onClick={handleResendVerificationCode}
                          >
                            Resend
                          </button>{" "}
                        </div>
                        <div>
                          <label
                            className={styles.verificationLabel}
                            htmlFor="verificationCode"
                          >
                            Verification Code:
                          </label>
                          <input
                            type="text"
                            id="verificationCode"
                            value={verificationCode}
                            onChange={(e) =>
                              setVerificationCode(e.target.value)
                            }
                            className={styles.verificationCode}
                          />
                          <button
                            id="verifyButton"
                            className={styles.verifyButton}
                            onClick={handleVerification}
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {recoverPasswordMode && (
                    <div className={styles.passwordResetForm}>
                      {showResetPass && <PasswordResetForm />}
                      <button
                        className={`${styles.verifyButton} ${styles.cancel}`}
                        onClick={handleExitRecoverMode}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Suspense>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.verifyButton} onClick={handleGuestLogin}>
            Enter as a guest
          </button>
        </div>
      </Provider>
      <Footer copyright="2023 Ana Sequeira" />
    </div>
  );
};

export default App;
