import * as ActionType from '../Actiontype';

export const signupRequest = (data) => (dispatch) => {
    dispatch({type: ActionType.SIGNUP_REQUEST, payload: data})
}

export const emailVarification = () => (dispatch) => {
    dispatch({type: ActionType.EMAIL_VARIFICATION})
}

export const loginRequest = (data) => (dispatch) => {
    dispatch({type: ActionType.LOGIN_REQUEST, payload: data})
}

export const loggedIn = (data) => (dispatch) => {
    dispatch({type: ActionType.LOGGED_IN, payload: data})
}

export const passwordForgotRequest = (data) => (dispatch) => {
    dispatch({type: ActionType.PASS_FORGOT_REQUEST, payload: data})
}

export const passForgoted = () => (dispatch) => {
    dispatch({type: ActionType.PASS_FORGOTED})
}

export const logoutRequest = () => (dispatch) => {
    dispatch({type: ActionType.LOGOUT_REQUEST})
}

export const loggedOut = () => (dispatch) => {
    dispatch({type: ActionType.LOGGED_OUT})
}

export const authError = (data) => (dispatch) => {
    dispatch({type: ActionType.AUTH_ERROR, payload: data})
}