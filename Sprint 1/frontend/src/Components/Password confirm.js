import React, { useState } from 'react';

const PassChange = () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (password1 === password2) {
      setShowConfirmation(true);
    } else {
      setShowError(true);
    }
  };

  const handleOk = () => {
    window.location.href = '/instructor';
  };

  return (
    <div>
      <label>New Password</label>
      <br />
      <input type="password" value={password1} onChange={e => setPassword1(e.target.value)} />
      <br />
      <br />
      <label>Confirm Password</label>
      <br />
      <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
      <br />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {showConfirmation && (
        <div>
          Password Change Confirmed!
          <br />
          <br />
          <button onClick={handleOk}>OK</button>
        </div>
      )}
      {showError && (
        <div>
          Passwords do not match
          <br />
          <br />
          <button onClick={() => setShowError(false)}>OK</button>
        </div>
      )}
    </div>
  );
};

export default PassChange;
