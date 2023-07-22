import * as ActionType from '../Actiontype';

const initState = {
    medicine: [],
    loading: false,
    error: null
}

export const medicineReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionType.DOCTORS_SUCCESS:
            return {
                ...state,
                medicine: action.payload
            }
        default:
            return state
    }
}