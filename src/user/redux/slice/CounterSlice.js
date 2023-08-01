import { createSlice } from "@reduxjs/toolkit"

const initState = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState: initState,
    reducers: ({
        increment: (state, action) => {
            state.count++
        },
        decrement: (state, action) => {
            state.count--
        }
    })
})

export const {increment, decrement} = counterSlice.actions
export default counterSlice.reducer