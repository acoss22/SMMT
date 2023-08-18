import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

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
    <div>
      {resetSuccessful ? (
        <p>Password reset successful! You can now log in with your new password.</p>
      ) : (
        <form>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        
            <div>
              <button type="button" onClick={handlePasswordReset}>Request Password Reset</button>
            </div>
         
            <div>
              <label>Verification Code:</label>
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
              <button type="button" onClick={handlePasswordSubmit}>Submit New Password</button>
            </div>
         
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      )}
    </div>
  );
}

export default PasswordResetForm;
