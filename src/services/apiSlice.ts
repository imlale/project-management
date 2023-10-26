import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project } from "../models/projectTypes";
import { projectAdapter } from "../adapters";
import { getSessionData } from "../utilities/SessionStorage";




export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://polarisweb.com.co/wp-json/custom/v1/' }),
    endpoints: (build) => ({
        getProjects: build.query<Project[], string>({
            query: (onwerId) => ({
                url: 'projects/?owner.id=' + onwerId,
                method: 'GET',
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,
                  'User-ID': `${getSessionData().id}` },
            }),
            transformResponse: (response) => projectAdapter.projectsListAdapterQuery(response),
            providesTags:  ['ProjectList'] as any //usar con invalidateTags en un mutation, para volver a llaamr

        }),
        getProjectById: build.query({
            query: (projectId) => ({
                url: 'projects/' + projectId,
                method: 'GET',
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,  'User-ID': `${getSessionData().id}` },
            }),
            providesTags:  ['Project'] as any,
            transformResponse: (response) => projectAdapter.projectAdapterQuery(response)
        }),
        deleteProject: build.mutation({
            query: (projectId) => ({
                url: 'projects/' + projectId,
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,  'User-ID': `${getSessionData().id}` },
            }),
            invalidatesTags: ['ProjectList'] as any            
        }),
        createProject: build.mutation({
            query: (projectData) => ({
                url: 'projects/',
                method: 'POST',
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,  'User-ID': `${getSessionData().id}` },
                body: projectAdapter.projectsAdapterCreate(projectData)
            }),
            invalidatesTags: ['ProjectList'] as any            
        }),
        updateProject: build.mutation({
            query: (projectData ) => ({
                url: 'projects/' + projectData.id,
                method: 'PATCH',
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,  'User-ID': `${getSessionData().id}` },
                body: projectAdapter.projectsAdapterCreate(projectData)
            }),
            invalidatesTags: ['ProjectList', 'Project'] as any            
        }),


    })
})


export const { useGetProjectsQuery,
    useGetProjectByIdQuery,
    useDeleteProjectMutation,
    useCreateProjectMutation,
    useUpdateProjectMutation,

} = apiSlice;
