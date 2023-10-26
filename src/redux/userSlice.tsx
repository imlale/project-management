import { createSlice } from "@reduxjs/toolkit";
import { Person } from "../models/projectTypes";

const initialState = {
    userProfile: JSON.parse(sessionStorage.getItem('userData')??'{}') as Person

}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserProfile(state, action){
            state.userProfile = action.payload
        }
    }

})

export const {setUserProfile} = userSlice.actions
export default userSlice.reducer