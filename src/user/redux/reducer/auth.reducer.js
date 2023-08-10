import * as ActionType from '../Actiontype';

const initState = {
    user: [],
    loading: false,
    error: null
}

export const authReducer = (state = initState, action) => {
    console.log(action);

    switch (action.type) {
        case ActionType.SIGNUP_REQUEST:
            return {
                ...state
            }
        default:
            return state
    }
}