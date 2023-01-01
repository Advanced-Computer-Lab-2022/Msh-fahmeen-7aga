import {UseLoginContextAdmin} from './UseLoginContextAdmin'

export const UseLogoutadmin = () => {
    const {dispatch} = UseLoginContextAdmin()

    const logoutAdm = () => {
        localStorage.removeItem('admin')

        dispatch({type: 'LOGOUT'})
    }

    return {logoutAdm}
}
