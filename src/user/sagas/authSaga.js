import { all, call, put, takeEvery } from 'redux-saga/effects'
import { loginAPI, passwordForgotAPI, signupAPI } from '../../common/apis/auth.api'
import * as ActionType from '../redux/Actiontype'
import { setAlert } from '../redux/slice/AlertSlice'

function* signupUser(action) {
    try {
        const user = yield call(signupAPI, action.payload)
        yield put(setAlert({ text: user.message, color: 'success' }))
    } catch (e) {
        yield put(setAlert({ text: e.message, color: 'error' }))
    }
}

function* loginUser(action) {
    try {
        const user = yield call(loginAPI, action.payload)
        yield put(setAlert({ text: user.message, color: 'success' }))
    } catch (e) {
        yield put(setAlert({ text: e.message, color: 'error' }))
    }
}

function* passwordForgotUser(action) {
    try {
        const user = yield call(passwordForgotAPI, action.payload)
        yield put(setAlert({ text: user.message, color: 'success' }))
    } catch (e) {
        yield put(setAlert({ text: e.message, color: 'error' }))
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


export function* authSaga() {
    yield all([
        signupSaga(),
        loginSaga(),
        passwordForgotSaga()
    ])
}