import * as ActionType from '../Actiontype';

export const increment = () => (dispatch) => {
    dispatch({type: ActionType.COUNTER_INCREMENT});
}

export const decrement = () => (dispatch) => {
    dispatch({type: ActionType.COUNTER_DECREMENT});
}