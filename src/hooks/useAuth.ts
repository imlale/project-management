import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useDispatch } from "react-redux";


import { useCreatePersonMutation, useUpdatePersonMutation } from "../services/apiPersonSlice";
import { setUserProfile } from "../redux/userSlice";
import { Person } from "../models/projectTypes";



const useAuth = () => {

    const [createPerson] = useCreatePersonMutation()
    const [updatePerson] = useUpdatePersonMutation()
    const dispatch = useDispatch()
    const { userProfile } = useSelector((state: RootState) => state.user)
    

    const userIdString = (sessionStorage.getItem('userId') ?? userProfile.id ?? '').toString()
    const isLogged = userIdString !== ''
    const hasPermissions =() =>{

        let permissions = false
        permissions = isLogged
        return permissions
    }

    const createSessionAuth = (person: Person, data: any) => {
        return new Promise((resolve, reject) => {
            let messageText = ''
            let ok = true
            dispatch(setUserProfile(person))
            sessionStorage.setItem('userId', person.id.toString())
            sessionStorage.setItem('userData', JSON.stringify(person))
            if (!data[0]) { //si no existe
                createPerson(person).unwrap()
                    .then(() => {
                        messageText = 'Account created ' + person.name
                        resolve({ ok, messageText })
                    })
                    .catch((e) => {
                        messageText = 'Error Creating Account -' + e.originalStatus
                        ok = false
                        reject({ ok, messageText })
                    })
            } else { //si existe
                updatePerson(person)
                    .unwrap().then(() => {
                        messageText = 'Welcome ' + person.name
                        resolve({ ok, messageText })
                    }).catch((e) => {
                        messageText = 'Error updating accounta -' + e.originalStatus
                        ok = false
                        reject({ ok, messageText })
                    })
            }
        })

    }


    return { isLogged, hasPermissions, userProfile, createSessionAuth, userIdString }
}


export default useAuth