import { addDepartmentData, deleteDepartmentData, getDepartmentData, updateDepartmentData } from '../../../common/apis/department.api';
import * as ActionType from '../Actiontype';

export const getDepartment = () => (dispatch) => {
    try {
        dispatch(loadingDepartmentData(true));
        setTimeout(() => {
            getDepartmentData()
                .then((response) => dispatch({ type: ActionType.DEPARTMENT_GET, payload: response.data }))
                .catch((error) => dispatch(getError(error.message)))
        }, 1500);
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const addDepartment = (data) => (dispatch) => {
    try {
        addDepartmentData(data)
            .then((response) => dispatch({ type: ActionType.DEPARTMENT_ADD, payload: response.data }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const deleteDepartment = (id) => (dispatch) => {
    console.log('hello')
    try {
        deleteDepartmentData(id)
            .then(dispatch({ type: ActionType.DEPARTMENT_DELETE, payload: id }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const updateDepartment = (data) => (dispatch) => {
    try {
        updateDepartmentData(data)
            .then((response) => dispatch({ type: ActionType.DOCTORS_UPDATE, payload: response.data }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const loadingDepartmentData = (status) => (dispatch) => {
    dispatch({ type: ActionType.DEPARTMENT_LOADING, payload: status })
}

export const getError = (error) => (dispatch) => {
    dispatch({ type: ActionType.DEPARTMENT_ERROR, payload: error })
}