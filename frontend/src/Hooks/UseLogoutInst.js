import {UseLoginContextInst} from './UseLoginContextInst'

export const UseLogoutinst = () => {
    const {dispatch} = UseLoginContextInst()

    const logout = () => {
        localStorage.removeItem('instructor')

        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}