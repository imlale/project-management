import type { Task } from "../models/projectTypes"

const properties = {
    id: "id",
    title: "title",
    description: "description",
    assignees: "assignees",
    assigneesId: "id",
    assignessName: "name",
    assignessAvatar: "avatar",
    createdBy: "created_by",
    attachedImage: "attachedImage",
    status: "status",
    timeline: "timeline",
    startDate: "startDate",
    endDate: "endDate",
    tags: "tags",
    projectId: "projectId",
}

const taskAdapterQuery = (taskAPI: any): Task => {
    if (taskAPI.id === 0) {
        return { id: taskAPI.id } as Task
    }

    const timeline = {
        startDate: taskAPI[properties.timeline][properties.startDate],
        endDate: taskAPI[properties.timeline][properties.endDate]
    }
    const task: Task = {
        id: taskAPI[properties.id],
        title: taskAPI[properties.title],
        description: taskAPI[properties.description],
        attachedImage: taskAPI[properties.attachedImage],
        status: taskAPI[properties.status],
        createdBy: taskAPI[properties.createdBy],
        projectId: taskAPI[properties.projectId],
        tags: taskAPI[properties.tags],
        timeline,
        assignees: taskAPI[properties.assignees]?
        taskAPI[properties.assignees].map((assignee: any) => ({
            id: assignee[properties.assigneesId],
            name: assignee[properties.assignessName],
            avatar: assignee[properties.assignessAvatar]
        }))
        :[]
    }
    return task
}

const taskAdapterUpdate = (task: Task) => {    
    const taskAPI = {
        id: task.id,
        title: task.title,
        description: task.description,
        assignees: task.assignees,        
        created_by: task.createdBy,
        attachedImage:  task.attachedImage,
        status: task.status,
        timeline: task.timeline,  
        tags: task.tags,
        projectId: task.projectId,
    } 

    return taskAPI;

}

const tasksListAdapter = (tasksListAPI : any) : Task[]=>{
    const tasksList = tasksListAPI.map((task: Task)=>{
        return taskAdapterQuery(task)
    })

    return tasksList
}
export const taskAdapter = { taskAdapterQuery, taskAdapterUpdate, tasksListAdapter, properties }
