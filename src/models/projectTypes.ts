export interface Project {
    title:       string;
    description: string;
    id : number,
    status: string,
    startDate: string,
    endDate: string,
    budget: string,
    owner: Person,
    teamMembers: Person[],
    tags: string[],
}

export interface Task {
    id:            number;
    title:         string;
    description:   string;
    assignees:     Person[];
    createdBy:     Person;
    attachedImage: string;
    status:        string;
    timeline:      Timeline;
    tags:          string[];
    projectId:     number;
}

export interface SubTasks{
    id: number, 
    taskId: number;
    subTasks: SubTask[]
}
export interface SubTask {
    taskId?:          number;
    description: string;
    finished:    boolean;
}

export interface Person {
    id : number 
    name:   string;
    avatar: string;
    email?: string;
    acccesJTI?: string;
}

export interface Timeline {
    startDate: string;
    endDate:   string;
}
