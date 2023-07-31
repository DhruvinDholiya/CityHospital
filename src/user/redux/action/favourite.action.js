import * as ActionType from '../Actiontype'

export const addToFavourtite = (fid) => (dispatch) => {
    dispatch({ type: ActionType.ADD_TO_FAVOURITE, payload: fid })
}

export const removeToFavourtite = (fid) => (dispatch) => {
    dispatch({ type: ActionType.REMOVE_TO_FAVOURITE, payload: fid })
}