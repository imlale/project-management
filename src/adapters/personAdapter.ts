import { Person } from "../models/projectTypes"

const personAdapterQuery = (personAPI : any)=>{
    const assignee = personAPI
    return assignee
}


const personAdapterUpdate = (person : Person)=>{
    const personAPI = {
        "id": person.id,
      "name": person.name,
      "email": person.email,
      "avatar": person.avatar,
      "accces_jit": person.acccesJTI
    } 
    return personAPI
}
export const personAdapter = { personAdapterQuery, personAdapterUpdate}