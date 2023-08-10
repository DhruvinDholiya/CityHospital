import * as ActionType from '../Actiontype';

export const signupRequest = (data) => (dispatch) => {
    dispatch({type: ActionType.SIGNUP_REQUEST, payload: data})
}

export const loginRequest = (data) => (dispatch) => {
    dispatch({type: ActionType.LOGIN_REQUEST, payload: data})
}

export const passwordForgotRequest = (data) => (dispatch) => {
    dispatch({type: ActionType.PASS_FORGOT_REQUEST, payload: data})
}