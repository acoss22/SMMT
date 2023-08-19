import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import styles from './passwordreset.module.scss';
interface PasswordResetFormProps {
  // Add any props you might need here
}

function PasswordResetForm(props: PasswordResetFormProps) {
  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [resetSuccessful, setResetSuccessful] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlePasswordReset = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Step 1: Request password reset
      await Auth.forgotPassword(email);

      // Step 2: Display verification code input
      setResetSuccessful(false); // Reset the successful state to allow for code input
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Step 3: Reset password using verification code
      await Auth.forgotPasswordSubmit(email, verificationCode, newPassword);

      // Password reset successful
      setResetSuccessful(true);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: any) => {
    console.log(error);
  };

  
  return (
    <div className={styles['form-container']}>
      {resetSuccessful ? (
        <p>Password reset successful! You can now log in with your new password.</p>
      ) : (
        <form>
          <div className={styles['form-element']}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        
          <div className={styles['button-container']}>
            <button type="button" onClick={handlePasswordReset}>Request Password Reset</button>
          </div>
         
          <div className={styles['form-element']}>
            <label className={styles['verfication-code']}>Verification Code:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button  className={styles['button-newpass']} type="button" onClick={handlePasswordSubmit}>Submit New Password</button>
          </div>
         
          {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
        </form>
      )}
    </div>
  );
}

export default PasswordResetForm;
