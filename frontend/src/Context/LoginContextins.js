import {createContext, useReducer, useEffect} from 'react'

export const LoginContext = createContext()

export const LoginReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return{instructor: action.payload}
        case 'LOGOUT':
            return{instructor: null}
        default:
            return state        
    }
}

export const LoginContextProviderinst = ({children}) => {
    const [state, dispatch] = useReducer(LoginReducer, {
        instructor: null
    })

    useEffect(() => {
        const instructor = JSON.parse(localStorage.getItem('instructor'))

        if (instructor){
            dispatch({type: 'LOGIN', payload: instructor})
        }

    }, [])

    console.log('LoginContext state: ', state)

    return(
        <LoginContext.Provider value={{...state, dispatch}}>
            {children}
        </LoginContext.Provider>
    )
}