import {useState} from 'react'
import {UseLoginContextAdmin} from './UseLoginContextAdmin'

export const UseAdminLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = UseLoginContextAdmin()

    const login = async (Email, Password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/useradmin/adminlogin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({Email, Password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //saving user locally
            localStorage.setItem('admin', JSON.stringify(json))

            //Update login context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}
