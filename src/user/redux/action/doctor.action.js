import * as ActionType from '../Actiontype';

export const getDoctorsData = () => {
    return (dispatch) => {
        fetch('http://localhost:3004/doctors')
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionType.DOCTORS_SUCCESS, payload: data }))
            .catch((error) => console.log(error));
    };
};








