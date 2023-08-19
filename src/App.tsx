import React, { lazy, Suspense, useState } from "react";
import { Provider } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Auth } from "aws-amplify";
import styles from "./app.module.scss";
import "./styles.scss";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import PasswordResetForm from "./components/PasswordResetForm/PasswordResetForm";

const Tab = lazy(() => import("./components/Tabs/Tab"));

const App: React.FC = () => {
  const tabs: string[] = ["Followers", "Tasks", "Activity", "Analytics"];
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showResetPass, setShowResetPass] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeInputVisible, setVerificationCodeInputVisible] =
    useState(true);
  const [verificationEmail, setVerificationEmail] = useState("");

  const handleSwitchToSignUp = () => {
    setShowSignUp(true);
  };

  const handleSwitchToReset = () => {
    setShowResetPass(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignUp(false);
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      await Auth.signIn(username, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error (e.g., display error message to the user)
    }
  };

  const handleResendVerificationCode = async () => {
    try {
      const email = verificationEmail;

      // Construct the username based on email and timestamp
      const reconstructedUsername = `${email}#${Math.floor(Date.now() / 1000)}`;

      console.log(
        "Resending verification code for username:",
        reconstructedUsername
      );

      await Auth.resendSignUp(reconstructedUsername);
      // Optionally display a message to the user indicating the code has been resent
    } catch (error) {
      console.error("Resend verification code error:", error);
      // Handle resend verification code error (e.g., display error message to the user)
    }
  };

  const handleVerification = async () => {
    try {
      // Use the inputs for verificationEmail and verificationCode
      await Auth.confirmSignUp(verificationEmail, verificationCode);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Verification error:", error);
      // Handle verification error (e.g., display error message to the user)
    }
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error (e.g., display error message to the user)
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
          email, // Provide any additional attributes as needed
        },
      });
      setShowSignUp(false); // Close the sign-up form after successful sign-up
    } catch (error) {
      console.error("Sign-up error:", error);
      // Handle sign-up error (e.g., display error message to the user)
    }
  };

  return (
    <div className={styles.main}>
      <Header
        title="Social Media Management Tool"
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
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
                      onSwitchToReset={handleSwitchToReset}
                    />
                  )}
                  {showSignUp && (
                    <SignUpForm
                      onSwitchToLogin={handleSwitchToLogin}
                      onSignUp={handleSignUp}
                    />
                  )}
                  {verificationCodeInputVisible && (
                    <div className={styles.verificationBlock}>
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
                            Resend Code
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
                  <div className={styles.passwordResetForm}>
                  {showResetPass && <PasswordResetForm />}
                  </div>
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
