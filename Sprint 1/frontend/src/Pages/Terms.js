import React from 'react';
import { Link } from 'react-router-dom';

function TermsAndConditions() {
  return (
    <div>
      <h1>Terms and Conditions</h1>
      <p>Welcome to our online learning platform! By signing up, you agree to the following terms and conditions:</p>
      <ul>
        <li>You are entitled to a refund on a course you have registered for if you have completed less than 50% of the course.</li>
      </ul>
      <p>Please read and accept the terms and conditions before proceeding:</p>
      <form>
        <input type="checkbox" id="accept-terms" required />
        <label htmlFor="accept-terms">I have read and accept the terms and conditions</label>
        <br />
        <Link to="/student">
          <button type="submit">Proceed</button>
        </Link>
      </form>
    </div>
  );
}

export default TermsAndConditions;
