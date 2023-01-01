import { useState } from "react";
import { Link } from "react-router-dom";
import { UseStudentLogin } from "../Hooks/UseLogin";

const LogIn = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { login, error, isLoading } = UseStudentLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(Email, Password);
  };

  return (
    <form className="Login" onSubmit={handleSubmit}>
      <h3>Login</h3>

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

      <button disabled={isLoading}>Login</button>
      <div className="center">
      <Link to ='/instructorlogin'>Im an Instructor</Link>
      </div>
      <div className="center">
      <Link to ='/Adminlogin'>Im an Admin</Link>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LogIn;
