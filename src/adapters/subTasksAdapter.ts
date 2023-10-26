import type { SubTask, SubTasks } from "../models/projectTypes";

const properties = {
    id: 'id',
    taskId  : "taskId",
    subTaksArray : "subtasks",
    description: "description",
    finished: "finished"
}

const subTaskAdapterQuery = ( subTasksAPI: any) : SubTasks=> {
    
    const subTasks = [] as SubTask[]
    if(!subTasksAPI[0]) return {} as SubTasks    
    const subTasksAPIArray = subTasksAPI[0][properties.subTaksArray]
    
    for (let i = 0; i < subTasksAPIArray.length; i++) {        
        subTasks.push({
            taskId: subTasksAPIArray[i][properties.taskId],
            description: subTasksAPIArray[i][properties.description],
            finished: subTasksAPIArray[i][properties.finished]
        })
    }
    const subTaskById = {
        id: subTasksAPI[0][properties.id],
        taskId : subTasksAPI[0][properties.taskId] ,
        subTasks : subTasks
    } 

    return subTaskById
}

const subTaskAdapaterUpdate = ( updatedSubTasks: SubTasks)=> {
    const subTaskArray = updatedSubTasks.subTasks
    const subTasksAPIArray = []
    for(let i = 0; i < subTaskArray.length; i++){
        subTasksAPIArray.push({            
            [properties.description] : subTaskArray[i].description,
            [properties.finished] : subTaskArray[i].finished
        })
    }
    return {[properties.subTaksArray] : subTasksAPIArray, [properties.taskId]: updatedSubTasks.taskId}

}

const subTaskAdapter = {subTaskAdapterQuery, subTaskUpdateAdapater: subTaskAdapaterUpdate, properties}
export default subTaskAdapter