import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    windowSize: false
}

export const screenSlice = createSlice({
    name: 'screen',
    initialState: initialState,
    reducers: {
        setWindowSize: (state, action) => {
            state.windowSize = action.payload
        }

    }
})

export const {setWindowSize} = screenSlice.actions;
export default screenSlice.reducer;