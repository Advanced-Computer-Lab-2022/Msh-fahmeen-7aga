import { LoginContext } from "../Context/LoginContextTrainee";
import { useContext } from "react";

export const UseLoginContextTrainee = () => {
    const Context = useContext(LoginContext)
    if(!Context){
        throw Error('Use  Context in Provider')
    }
    
    return Context
}    