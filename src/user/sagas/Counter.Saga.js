import { put, takeEvery } from 'redux-saga/effects';
import { COUNTER_INCREMENT, COUNTER_DECREMENT } from '../redux/Actiontype';

function* incrementSaga() {
  yield put({ type: COUNTER_INCREMENT });
}

function* decrementSaga() {
  yield put({ type: COUNTER_DECREMENT });
}

export function* CounterSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementSaga);
  yield takeEvery('DECREMENT_ASYNC', decrementSaga);
}
