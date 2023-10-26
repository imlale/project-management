import { Person } from "../models/projectTypes"

export const getSessionData =() =>{
    return JSON.parse(sessionStorage.getItem('userData')??'{acccesJTI : 0}') as Person
}