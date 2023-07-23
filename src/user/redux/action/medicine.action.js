import * as ActionType from '../Actiontype';

export const getMedicineData = () => (dispatch) => {
    try {
        dispatch(loadingMedicineData(true))
        setTimeout(() => {
            fetch('http://localhost:3004/medicines')
                .then((response) => {
                    if(response.ok) {
                        return  response.json();
                    }
                    throw new Error('Somthing went wrong');
                })
                .then((data) => dispatch({ type: ActionType.MEDICINE_SUCCESS, payload: data }))
                .catch((error) => dispatch(errorMedicineData(error.message)));
        }, 1500);
    } catch (error) {
        dispatch(errorMedicineData(error.message))
    }
}

export const addMedicineData = (data) => (dispatch) => {
    try {
        fetch('http://localhost:3004/medicines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionType.MEDICINE_ADD, payload: data }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error)
    }
}

export const deleteMedicineData = (id) => (dispatch) => {
    try {
        fetch('http://localhost:3004/medicines/' + id, {
            method: 'DELETE',
        })
            .then(dispatch({ type: ActionType.MEDICINE_DELETE, payload: id }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error)
    }
}

export const updateMedicineData = (data) => (dispatch) => {
    try {
        fetch('http://localhost:3004/medicines/' + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(dispatch({ type: ActionType.MEDICINE_UPDATE, payload: data }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error)
    }
}

export const loadingMedicineData = (status) => (dispatch) => {
    dispatch({ type: ActionType.MEDICINE_lOADING, payload: status })
}

export const errorMedicineData = (error) => (dispatch) => {
    dispatch({ type: ActionType.MEDICINE_ERROR, payload: error })
}