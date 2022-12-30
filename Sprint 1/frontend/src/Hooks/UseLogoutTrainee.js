import {UseLoginContextTrainee} from './UseLoginContextTrainee'

export const UseLogouttrainee = () => {
const {dispatch} = UseLoginContextTrainee()
const logout = () => {
    localStorage.removeItem('trainee')

    dispatch({type: 'LOGOUT'})
}

return {logout}
}