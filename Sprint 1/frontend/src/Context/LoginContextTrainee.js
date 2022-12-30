import {createContext, useReducer, useEffect} from 'react'

export const LoginContext = createContext()

export const LoginReducer = (state, action) => {
switch(action.type){
case 'LOGIN':
return{trainee: action.payload}
case 'LOGOUT':
return{trainee: null}
default:
return state
}
}

export const LoginContextProvidertrainee = ({children}) => {
const [state, dispatch] = useReducer(LoginReducer, {
trainee: null
})

useEffect(() => {
    const trainee = JSON.parse(localStorage.getItem('trainee'))

    if (trainee){
        dispatch({type: 'LOGIN', payload: trainee})
    }

}, [])

console.log('LoginContext state: ', state)

return(
    <LoginContext.Provider value={{...state, dispatch}}>
        {children}
    </LoginContext.Provider>
)
}