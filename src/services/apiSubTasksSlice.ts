import { subTaskAdapter } from "../adapters";
import { apiSlice } from "./apiSlice";
import { getSessionData } from "../utilities/SessionStorage";

const subTasksApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getSubTaskByTask: build.query({
            query: (taskId) => ({
                url: 'subtasks/?taskId=' + taskId,
                method: 'GET',
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,  'User-ID': `${getSessionData().id}` },
            }),
            //providesTags: (result, error, id) => result&&!error&&[{ type: 'SubTasks', id }] as any,
            providesTags: ['SubTasks'] as any,
            transformResponse: (response) => subTaskAdapter.subTaskAdapterQuery(response),

        }),
        updateSubTaskByTask: build.mutation({
            query: ({ id, taskId, updatedTasks }) => ({
                url: 'subtasks/'+ id,
                method: 'PUT',
                body: subTaskAdapter.subTaskUpdateAdapater({ id, taskId, subTasks:updatedTasks }),
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,  'User-ID': `${getSessionData().id}` },
            }),
            invalidatesTags: ['SubTasks'] as any,//(result, error, { id }) =>result&&!error&& [{ type: 'SubTasks', id }] as any,
        }),
        createSubTaskByTask: build.mutation({
            query: ( newTasks ) => ({
                url: 'subtasks/',
                method: 'POST',
                body: subTaskAdapter.subTaskUpdateAdapater(newTasks),
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,  'User-ID': `${getSessionData().id}` },
            }),
            //invalidatesTags: ['SubTasks'] as any,//(result, error, { id }) =>result&&!error&& [{ type: 'SubTasks', id }] as any,
        })
    })
})

export const {useGetSubTaskByTaskQuery, useUpdateSubTaskByTaskMutation,
useCreateSubTaskByTaskMutation} = subTasksApi