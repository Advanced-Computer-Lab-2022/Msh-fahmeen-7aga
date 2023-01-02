import React, { useState, useEffect } from "react";
import { UseLoginContext } from "../Hooks/UseLoginContext";

const AddFunds = () => {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const { student } = UseLoginContext();

  useEffect(() => {
    const studentEmail = student.Email;
    const handleSubmit = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/guest/student/deposit",
          {
            method: "POST",
            body: JSON.stringify({ email: studentEmail, amount }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (amount > 0) {
      handleSubmit();
    }
  }, [amount]);

  return (
    <form>
      <label>
        Credit Card Number:
        <input
          type="text"
          value={creditCardNumber}
          onChange={(event) => setCreditCardNumber(event.target.value)}
        />
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Funds</button>
    </form>
  );
};

export default AddFunds;
