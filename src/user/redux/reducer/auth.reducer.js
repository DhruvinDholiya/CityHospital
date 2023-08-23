import * as ActionType from '../Actiontype';

const initState = {
    user: null,
    loading: false,
    error: null
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionType.SIGNUP_REQUEST:
        case ActionType.LOGIN_REQUEST:
        case ActionType.LOGOUT_REQUEST:
        case ActionType.PASS_FORGOT_REQUEST:
            return {
                user: null,
                loading: true,
                error: null
            }
        case ActionType.EMAIL_VARIFICATION:
        case ActionType.LOGGED_OUT:
        case ActionType.PASS_FORGOTED:
            return {
                user: null,
                loading: false,
                error: null
            }
        case ActionType.LOGGED_IN:
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case ActionType.AUTH_ERROR:
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}