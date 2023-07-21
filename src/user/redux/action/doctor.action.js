import * as ActionType from '../Actiontype';

export const getDoctorsData = () => (dispatch) => {
    try {
        dispatch(loadingDoctorsData(true));
        setTimeout(() => {
            fetch('http://localhost:3004/doctors')
                .then((response) => {
                    if(response.ok) {
                        return response.json();
                    }
                    throw new Error('Somthing went wrong');
                })
                .then((data) => dispatch({ type: ActionType.DOCTORS_SUCCESS, payload: data }))
                .catch((error) => dispatch(getError(error.message)));
        }, 2000);
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const addDoctorsData = (data) => (dispatch) => {
    try {
        fetch('http://localhost:3004/doctors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionType.DOCTORS_ADD, payload: data }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const deleteDoctorData = (id) => (dispatch) => {
    try {
        fetch('http://localhost:3004/doctors/' + id, {
            method: 'DELETE',
        })
            .then(dispatch({ type: ActionType.DOCTORS_DELETE, payload: id }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const updateDoctorData = (rowData) => (dispatch) => {
    try {
        fetch('http://localhost:3004/doctors/' + rowData.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rowData)
        })
            .then(dispatch({ type: ActionType.DOCTORS_UPDATE, payload: rowData }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const loadingDoctorsData = (status) => (dispatch) => {
    dispatch({type: ActionType.DOCTORS_lOADING, payload: status})
}

export const getError = (error) => (dispatch) => {
    dispatch({type: ActionType.DOCTORS_ERROR, payload: error})
}