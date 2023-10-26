
import { taskAdapter } from "../adapters";
import { apiSlice } from "./apiSlice";
import { getSessionData } from "../utilities/SessionStorage";

const taskApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTasksByProject: build.query({
            query: (projectId) => ({
                url: `tasks/?projectId=${projectId}`,
                method: 'GET',
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,  'User-ID': `${getSessionData().id}` },
            }),
            providesTags: ['ListTasks'] as any,
            transformResponse: (response) => taskAdapter.tasksListAdapter(response),
        }),
        getTaskById: build.query({
            query: (taskId) => ({
                url: 'tasks/' + taskId,
                method: 'GET',
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,  'User-ID': `${getSessionData().id}` },
            }),
            transformResponse: (response) => taskAdapter.taskAdapterQuery(response),
            providesTags: ['Tasks'] as any

        }),
        createTask: build.mutation({
            query: (data) => ({
                url: 'tasks/',
                method: 'POST',
                body: taskAdapter.taskAdapterUpdate(data),
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,  'User-ID': `${getSessionData().id}` },
            }),
            invalidatesTags: ["ListTasks"] as any 
        }),
        updateTask: build.mutation({
            query: ({ taskId, data }) => ({
                url: 'tasks/' + taskId,
                method: 'PATCH',
                body: taskAdapter.taskAdapterUpdate(data),
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,  'User-ID': `${getSessionData().id}` },
            }),
            invalidatesTags: ['Tasks', 'ListTasks'] as any//(result) => ({ type: 'Task', id: result?result.id: "TASK"} as const) as any

        }),
        deleteTask: build.mutation({
            query: (taskId) => ({
                url: 'tasks/' + taskId,
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getSessionData().acccesJTI}`,  'User-ID': `${getSessionData().id}` },
                
            }),
            invalidatesTags: ["ListTasks"] as any 
            //invalidatesTags: ['Tasks'] as any//(result) => ({ type: 'Task', id: result?result.id: "TASK"} as const) as any

        }),

    })
})

export const { useGetTaskByIdQuery,
    useGetTasksByProjectQuery,
    useUpdateTaskMutation,
    useCreateTaskMutation,
    useDeleteTaskMutation,
} = taskApi