import { createSlice } from "@reduxjs/toolkit"
import { Task } from "../models/projectTypes"


const initialState = {

    tasksListData: [] as Task[],
    filters : { assignees: [] as number[]}
}


export const taskListSlice = createSlice({
    name: 'taskList',
    initialState: initialState,
    reducers: {
        setTaskList: (state, action) => {
            state.tasksListData = action.payload
        },
        filterListByMember: (state, action) => {
            
            const ids = action.payload as number[]     
            state.filters = {assignees: ids}       
            /*const filteredList = initialState.filter((task) => {              
                    return task.assignees.find((assignee: Person) => ids.find((id) => id === assignee.id))             
            })            
            return filteredList.length > 0? filteredList: initialState*/
        }

    }
})


export const { setTaskList , filterListByMember} = taskListSlice.actions;
export default taskListSlice.reducer