import {UseLoginContextAdmin} from './UseLoginContextAdmin'

export const UseLogoutadmin = () => {
    const {dispatch} = UseLoginContextAdmin()

    const logout = () => {
        localStorage.removeItem('admin')

        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}
