import {createContext, useReducer, useEffect} from 'react'

export const LoginContext = createContext()

export const LoginReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return{admin: action.payload}
        case 'LOGOUT':
            return{admin: null}
        default:
            return state        
    }
}

export const LoginContextProvideradmin = ({children}) => {
    const [state, dispatch] = useReducer(LoginReducer, {
        admin: null
    })

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem('admin'))

        if (admin){
            dispatch({type: 'LOGIN', payload: admin})
        }

    }, [])

    console.log('LoginContext state: ', state)

    return(
        <LoginContext.Provider value={{...state, dispatch}}>
            {children}
        </LoginContext.Provider>
    )
}
