import { Project } from "../models/projectTypes"

const projectAdapterQuery = (projectAPI : any)=>{
    const project: Project = {...projectAPI}
    return project
}

const projectsListAdapterQuery = (projectAPI : any)=>{
    const project: Project[] = [...projectAPI]
    return project
}

const projectsAdapterCreate = (projectData : Project)=>{
    const projectAPI = {...projectData, teamMembers_ids: projectData.teamMembers,
    }
    return projectAPI
}

const projectAdapter = {projectAdapterQuery, projectsListAdapterQuery, projectsAdapterCreate}
export default projectAdapter