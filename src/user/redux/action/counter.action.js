import * as ActionType from '../Actiontype';

export const incrementAsync = () => ({
    type: ActionType.COUNTER_INCREMENT
});

export const decrementAsync = () => ({
    type: ActionType.COUNTER_DECREMENT,
});


