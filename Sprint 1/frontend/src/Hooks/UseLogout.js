import { UseLoginContext } from "./UseLoginContext";

export const UseLogout = () => {
  const { dispatch } = UseLoginContext();

  const logout = () => {
    localStorage.removeItem("student");

    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
