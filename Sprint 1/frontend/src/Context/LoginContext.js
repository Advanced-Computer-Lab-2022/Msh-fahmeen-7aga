import { createContext, useReducer, useEffect } from "react";

export const LoginContext = createContext();

export const LoginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { student: action.payload };
    case "LOGOUT":
      return { student: null };
    default:
      return state;
  }
};

export const LoginContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LoginReducer, {
    student: null,
  });

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));

    if (student) {
      dispatch({ type: "LOGIN", payload: student });
    }
  }, []);

  console.log("LoginContext state: ", state);

  return (
    <LoginContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
};
