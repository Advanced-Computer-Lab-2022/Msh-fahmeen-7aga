import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Forgotpassword = () => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate to the /resetconfirmation route
    return <Link to="/resetconfirmation" />;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
      <button>Submit</button>
    </form>
  );
};

export default Forgotpassword;
