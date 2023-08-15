import { all, call, put, takeEvery } from 'redux-saga/effects'
import { loginAPI, logoutAPI, passwordForgotAPI, signupAPI } from '../../common/apis/auth.api'
import * as ActionType from '../redux/Actiontype'
import { setAlert } from '../redux/slice/AlertSlice'
import { authError, emailVarification, loggedIn, loggedOut, passForgoted } from '../redux/action/Auth.action'

function* signupUser(action) {
    try {
        const user = yield call(signupAPI, action.payload)
        yield put(setAlert({ text: user.message, color: 'success' }))
        yield put(emailVarification());
    } catch (e) {
        yield put(setAlert({ text: e.message, color: 'error' }))
        yield put(authError(e.message))
    }
}

function* loginUser(action) {
    try {
        const user = yield call(loginAPI, action.payload.data)
        yield put(setAlert({ text: user.message, color: 'success' }))
        yield put(loggedIn(user.user))
        action.payload.callback("/")
    } catch (e) {
        yield put(setAlert({ text: e.message, color: 'error' }))
        yield put(authError(e.message))
    }
}

function* passwordForgotUser(action) {
    try {
        const user = yield call(passwordForgotAPI, action.payload)
        yield put(setAlert({ text: user.message, color: 'success' }))
        yield put(passForgoted());
    } catch (e) {
        yield put(setAlert({ text: e.message, color: 'error' }))
        yield put(authError(e.message))
    }
}

function* logoutUser() {
    try {
        const user = yield call(logoutAPI)
        yield put(loggedOut())
        yield put(setAlert({ text: user.message, color: 'success' }))
        console.log(user);
    } catch (e) {
        yield put(setAlert({ text: e.message, color: 'error' }))
        yield put(authError(e.message))
    }
}

function* signupSaga() {
    yield takeEvery(ActionType.SIGNUP_REQUEST, signupUser)
}

function* loginSaga() {
    yield takeEvery(ActionType.LOGIN_REQUEST, loginUser)
}

function* passwordForgotSaga() {
    yield takeEvery(ActionType.PASS_FORGOT_REQUEST, passwordForgotUser)
}

function* logoutSaga() {
    yield takeEvery(ActionType.LOGOUT_REQUEST, logoutUser)
}


export function* authSaga() {
    yield all([
        signupSaga(),
        loginSaga(),
        passwordForgotSaga(),
        logoutSaga()
    ])
}