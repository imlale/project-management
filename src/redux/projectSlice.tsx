import { createSlice } from "@reduxjs/toolkit"
import { Project } from "../models/projectTypes";


const initialState = //projectData
{
    projectData: {} as Project,
    teamMembers: [] as string[],
    formVisible: false,
    projectIdEditable: 0,

}



export const projectSlice = createSlice({
    name: 'project',
    initialState: initialState,
    reducers: {
        setProject: (state, action) => {
            state.projectData = action.payload 
        },
        setTeamMembers: (state, action) => {
            state.teamMembers = action.payload
        },
        setFormVisible: (state, action) =>{
            state.formVisible = action.payload
        },
        setProjectIdEditable: (state, action) =>{
            state.projectIdEditable = action.payload
        }

    }
})


export const { setProject, setTeamMembers, setProjectIdEditable, setFormVisible } = projectSlice.actions;
export default projectSlice.reducer