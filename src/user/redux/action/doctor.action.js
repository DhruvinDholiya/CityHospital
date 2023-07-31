import { addDoctorsData, deleteDoctorData, getDoctorsData, updateDoctorData } from '../../../common/apis/doctors.api';
import * as ActionType from '../Actiontype';

export const getDoctors = () => (dispatch) => {
    try {
        dispatch(loadingDoctorsData(true));
        setTimeout(() => {
            getDoctorsData()
                .then((response) => dispatch({ type: ActionType.DOCTORS_SUCCESS, payload: response.data }))
                .catch((error) => dispatch(getError(error.message)))

            // fetch('http://localhost:3005/doctors')
            //     .then((response) => {
            //         if (response.ok) {
            //             return response.json();
            //         }
            //         throw new Error('Somthing went wrong');
            //     })
            //     .then((data) => dispatch({ type: ActionType.DOCTORS_SUCCESS, payload: data }))
            //     .catch((error) => dispatch(getError(error.message)));
        }, 1500);
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const addDoctor = (data) => (dispatch) => {
    try {
        addDoctorsData(data)
            .then((response) => dispatch({ type: ActionType.DOCTORS_ADD, payload: response.data }))
            .catch((error) => console.log(error))
        // fetch('http://localhost:3005/doctors', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionType.DOCTORS_ADD, payload: data }))
        //     .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const deleteDoctor = (id) => (dispatch) => {
    console.log('hello')
    try {
        deleteDoctorData(id)
            .then(dispatch({ type: ActionType.DOCTORS_DELETE, payload: id }))
            .catch((error) => console.log(error))
        // fetch('http://localhost:3005/doctors/' + id, {
        //     method: 'DELETE',
        // })
        //     .then(dispatch({ type: ActionType.DOCTORS_DELETE, payload: id }))
        //     .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const updateDoctor = (data) => (dispatch) => {
    try {
        updateDoctorData(data)
            .then((response) => dispatch({ type: ActionType.DOCTORS_UPDATE, payload: response.data }))
            .catch((error) => console.log(error))
        // fetch('http://localhost:3005/doctors/' + rowData.id, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(rowData)
        // })
        //     .then(dispatch({ type: ActionType.DOCTORS_UPDATE, payload: rowData }))
        //     .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const loadingDoctorsData = (status) => (dispatch) => {
    dispatch({ type: ActionType.DOCTORS_lOADING, payload: status })
}

export const getError = (error) => (dispatch) => {
    dispatch({ type: ActionType.DOCTORS_ERROR, payload: error })
}