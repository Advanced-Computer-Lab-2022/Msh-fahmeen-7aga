import {useState} from 'react'
import {UseLoginContextTrainee} from './UseLoginContextTrainee'

export const UseTraineeLogin = () => {
const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)
const {dispatch} = UseLoginContextTrainee()

const login = async (Email, Password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/usertrainee/traineelogin', {
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
        localStorage.setItem('trainee', JSON.stringify(json))

        //Update login context
        dispatch({type: 'LOGIN', payload: json})

        setIsLoading(false)
    }
}

return {login, isLoading, error}
}