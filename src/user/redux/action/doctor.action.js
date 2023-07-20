import * as ActionType from '../Actiontype';

export const getDoctorsData = () => (dispatch) => {
    try {
        fetch('http://localhost:3004/doctors')
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionType.DOCTORS_SUCCESS, payload: data }))
            .catch((error) => console.log(error));
    } catch (error) {
        console.log(error);
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
        .then(dispatch({type: ActionType.DOCTORS_UPDATE, payload: rowData }))
        .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}


