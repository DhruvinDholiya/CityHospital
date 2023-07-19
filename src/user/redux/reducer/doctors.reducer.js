import * as ActionType from "../Actiontype";

const initState = {
    doctors: [],
    loading: false,
    error: null,
};

export const doctorsReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionType.DOCTORS_SUCCESS:
            return {
                ...state,
                doctors: action.payload,
            }
        default:
            return state;
    }
};
