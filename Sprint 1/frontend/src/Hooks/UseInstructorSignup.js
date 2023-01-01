import { useState } from "react";
import { UseLoginContextInst } from "./UseLoginContextInst";

export const UseInstructorSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = UseLoginContextInst();

  const signup = async (FirstName, Lastname, Email, Password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "http://localhost:4000/admin/instructorsignup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ FirstName, Lastname, Email, Password }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //saving user locally
      localStorage.setItem("instructor", JSON.stringify(json));

      //Update login context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
