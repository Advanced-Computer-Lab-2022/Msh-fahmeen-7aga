import { LoginContext } from "../Context/LoginContextins";
import { useContext } from "react";

export const UseLoginContextInst = () => {
    const Context = useContext(LoginContext)

    if(!Context){
        throw Error('Use  Context in Provider')
    }

    return Context
}