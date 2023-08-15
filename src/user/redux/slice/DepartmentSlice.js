import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDepartmentData, deleteDepartmentData, getDepartmentData, updateDepartmentData } from "../../../common/apis/department.api"

const initState = {
    department: [],
    loading: false,
    error: null
}

export const fetchDepartment = createAsyncThunk(
    'department/fetch',
    async () => {
        let response = await getDepartmentData();
        return response.data
    }
)

export const addDepartment = createAsyncThunk(
    'department/add',
    async (data) => {
        let response = await addDepartmentData(data);
        return response.data
    }
)

export const deleteDepartment = createAsyncThunk(
    'department/delete',
    async (id) => {
        await deleteDepartmentData(id);
        return id
    }
)

export const updateDepartment = createAsyncThunk(
    'department/update',
    async (data) => {
        await updateDepartmentData(data);
        return data
    }
)
const onLoading = (state, action) => {
    state.loading = true
}
const onRejected = (state, action) => {
    state.loading = false
    state.error = action.error.message
}


export const departmentSlice = createSlice({
    name: 'department',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartment.pending, onLoading)
            .addCase(fetchDepartment.fulfilled, (state, action) => {
                state.loading = false;
                state.department = action.payload;
                state.error = null;
            })
            .addCase(fetchDepartment.rejected, onRejected)
            .addCase(addDepartment.fulfilled, (state, action) => {
                state.department = state.department.concat(action.payload)
            })
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                state.department = state.department.filter((data) => data.id !== action.payload);
            })
            .addCase(updateDepartment.fulfilled, (state, action) => {
                let index = state.department.findIndex((val) => val.id === action.payload.id);
                if (index) {
                    state.department[index] = action.payload
                }
            })
    }
})


export default departmentSlice.reducer;