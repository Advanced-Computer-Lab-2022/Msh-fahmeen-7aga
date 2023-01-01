import { LoginContext } from "../Context/LoginContextadmin";
import { useContext } from "react";

export const UseLoginContextAdmin = () => {
    const Context = useContext(LoginContext)

    if(!Context){
        throw Error('Use  Context in Provider')
    }

    return Context
}
