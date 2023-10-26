import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; //PayloadAction
import type { Task } from "../models/projectTypes";


//data inicial
const initialState = {
    taskData: {} as Task,
    taskId: -1,
    visible: false,
    isCreating: false
}

//crear slice
export const taskSlice = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        setTaskData: (state, action) => {            
            state.taskData = Object.keys(action.payload).length > 0? {...state.taskData, ...action.payload}
            :{} as Task
        },
        setTask: (state, action: PayloadAction<number>) => {
            state.taskId = action.payload;
            state.visible = true
        },
        setVisible: (state, action: PayloadAction<boolean>) => {
            state.visible = action.payload
        },
        setIsCreating: (state, action: PayloadAction<boolean>) => {
            state.isCreating = action.payload
        },


    }
})

//exportar acciones
export const { setTaskData, setTask, setVisible, setIsCreating } = taskSlice.actions
//exportar reducer
export default taskSlice.reducer