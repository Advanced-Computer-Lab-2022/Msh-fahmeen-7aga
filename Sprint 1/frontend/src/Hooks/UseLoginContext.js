import { LoginContext } from "../Context/LoginContext";
import { useContext } from "react";

export const UseLoginContext = () => {
  const Context = useContext(LoginContext);

  if (!Context) {
    throw Error("Use  Context in Provider");
  }

  return Context;
};
