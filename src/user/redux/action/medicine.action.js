import * as ActionType from '../Actiontype';

export const getMedicineData = () => (dispatch) => {
    try {
        fetch('http://localhost:3004/medicines')
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionType.MEDICINE_SUCCESS, payload: data }))
            .catch((error) => console.log(error));
    } catch (error) {
        console.log(error)
    }
}