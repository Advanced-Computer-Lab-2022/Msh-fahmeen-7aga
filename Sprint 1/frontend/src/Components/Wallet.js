import React, { useState, useEffect } from 'react';
import { UseLoginContext } from '../Hooks/UseLoginContext';
import AddFunds from '../Components/Addfunds';

const StudentBalance = () => {
  const { student } = UseLoginContext();
  const [balance, setBalance] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    const studentEmail = student.Email;
    const fetchBalance = async () => {
      const response = await fetch('http://localhost:4000/guest/student/balance', {
        method: 'POST',
        body: JSON.stringify({ studentEmail }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setBalance(data.balance);
    };
    fetchBalance();
  }, []);

  const togglePaymentForm = () => {
    setShowPaymentForm(!showPaymentForm);
  };

  return (
    <div>
      <h1>Current Balance: {balance}</h1>
      <button onClick={togglePaymentForm}>Deposit</button>
      {showPaymentForm && <AddFunds />}
    </div>
  );
};

export default StudentBalance;
