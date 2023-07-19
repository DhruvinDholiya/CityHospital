import * as ActionType from '../Actiontype';

const initState = {
    count: 0
}

export const counterReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionType.COUNTER_INCREMENT:
            return {
                count: state.count + 1
            }
        case ActionType.COUNTER_DECREMENT:
            return {
                count: state.count - 1
            }
        default:
            return state
    }
}