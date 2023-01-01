import { useState } from "react";
import { UseInstructorSignup } from "../Hooks/UseInstructorSignup";

const SignUpinst = () => {
  const [FirstName, setFirstName] = useState("");
  const [Lastname, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { signup, error, isLoading } = UseInstructorSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(FirstName, Lastname, Email, Password);
  };

  return (
    <form className="Signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={FirstName}
      />

      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={Lastname}
      />

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={Email}
      />

      <label>Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={Password}
      />

      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUpinst;
