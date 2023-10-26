import { personAdapter } from "../adapters/personAdapter"
import { apiSlice } from "./apiSlice"
const apiPersonSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getPerson: build.query({
            query: (email) => ({
                url: 'persons/?email=' + email,
                method: 'GET'
            }),
            transformResponse: (response) => personAdapter.personAdapterQuery(response),
        }),
        getPersonById: build.query({
            query: (userId) => ({
                url: 'persons/?id=' + userId,
                method: 'GET'
            }),
            transformResponse: (response) => personAdapter.personAdapterQuery(response),
        }),
        createPerson: build.mutation({
            query: (person) => ({
                url: 'persons/',
                method: 'POST',
                body: personAdapter.personAdapterUpdate(person),
            }),           
            
        }),
        updatePerson: build.mutation({
            query: (person) => ({
                url: 'persons/' + person.id,
                method: 'PATCH',
                body: personAdapter.personAdapterUpdate(person),
            }),           
            
        }),
    })
}
) 

export const {
    useGetPersonQuery,
    useGetPersonByIdQuery,
    useCreatePersonMutation,
    useUpdatePersonMutation
} = apiPersonSlice