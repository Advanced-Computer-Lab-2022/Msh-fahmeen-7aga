import {UseLoginContextInst} from './UseLoginContextInst'

export const UseLogoutinst = () => {
    const {dispatch} = UseLoginContextInst()

    const logoutIns = () => {
        localStorage.removeItem('instructor')

        dispatch({type: 'LOGOUT'})
    }

    return {logoutIns}
}