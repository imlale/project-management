import { PROJECT_STATUS, TASK_STATUS } from "./statusParams"
import type { Project, Task } from "./projectTypes"

export const taskData: Task = {
    id: 1,
    title: 'Task title',
    description: 'Description for task 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent scelerisque massa at pulvinar gravida. Morbi bibendum ac purus vel viverra. Aliquam laoreet, diam eu convallis porta, nisi est accumsan neque, id porttitor massa risus quis est',
    assignees: [
        {
            id: 23,
            name: 'Dianna Doe',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
        },
        {
            id: 32,
            name: 'Jon Doe',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=2'
        },
        {
            id: 12,
            name: 'Miguel Doe',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=3'
        }
    ],
    createdBy: {
        id: 2,
        name: 'Creator Doe',
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
    },
    attachedImage: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    status: TASK_STATUS.TODO,
    timeline: {
        startDate: '2024-01-01',
        endDate:  '2024-02-01',
    },
    projectId : 1,
    tags: [
        'UX Design',
        'UX Concept',
        'Web Development',
    ]
}

const taskAssignees = [
    {
        id: 23,
        name: 'Dianna Doe',
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
    },
    {
        id: 62,
        name: 'Miryam Doe',
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=2'
    },
]

export const tasksListData: Task[] = [
    {...taskData, id: 1, title: 'Task Long Description, Long Description, Long Description 1', status: TASK_STATUS.IN_PROGRESS},
    {...taskData, id: 2, title: 'Task 2', status: TASK_STATUS.IN_REVIEW},
    {...taskData, id: 3, title: 'Task 3', attachedImage: 'https://tecnosoluciones.com/wp-content/uploads/2020/07/Cabecera-Art%C3%ADculos-3.jpg'},
    {...taskData, id: 4, title: 'Task 4', status: TASK_STATUS.IN_REVIEW, tags: ['Tag 4']},
    {...taskData, id: 5, title: 'Task 5',  tags: ['Mandrive']},
    {...taskData, id: 6, title: 'Task 6',  tags: ['Mandrive'], assignees: taskAssignees},
    {...taskData, id: 7, title: 'Task 7', status: TASK_STATUS.IN_REVIEW, tags: ['Mandrive']},
    {...taskData, id: 8, title: 'Task 8',  tags: ['Mandrive']},
    {...taskData, id: 9, title: 'Task 9', status: TASK_STATUS.COMPLETE,  tags: ['Mandrive'], attachedImage: ''},
]

export const tasksListData2: Task[] = [
    {...taskData, id: 11, title: 'Task Long Description, Long Description, Long Description 1', status: TASK_STATUS.IN_PROGRESS},
    {...taskData, id: 12, title: 'Task 12', status: TASK_STATUS.IN_REVIEW},
    {...taskData, id: 13, title: 'Task 13', attachedImage: 'https://tecnosoluciones.com/wp-content/uploads/2020/07/Cabecera-Art%C3%ADculos-3.jpg'},
    {...taskData, id: 14, title: 'Task 14', status: TASK_STATUS.IN_REVIEW, tags: ['Tag 4']},
    {...taskData, id: 15, title: 'Task 15',  tags: ['Mandrive']},
    {...taskData, id: 16, title: 'Task 16',  tags: ['Mandrive'], assignees: taskAssignees},
    {...taskData, id: 17, title: 'Task 17', status: TASK_STATUS.COMPLETE, tags: ['Mandrive']},
    {...taskData, id: 18, title: 'Task 18',  tags: ['Mandrive']},
    {...taskData, id: 19, title: 'Task 19', status: TASK_STATUS.COMPLETE,  tags: ['Mandrive']},
]
export const projectData : Project = {
    id : 1,
    title: 'Project Title 1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    status: PROJECT_STATUS.ACTIVE,
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    budget: '100000',
    owner: {
        id: 1,
        name: 'John Doe',
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
    },
    teamMembers: [
        {
            id: 32,
            name: 'John Doe',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
        },
        {
            id: 23,
            name: 'Diana Doe',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=2'
        },
        {
            id: 12,
            name: 'Miguel Doe',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=3'
        } 
        ,
        {
            id: 62,
            name: 'Miryam Doe',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=3'
        }         
    ],
    tags: [
        'Web Development',
        'Development'
    ]
}

export const projectListData: Project[] = [
    projectData,
    {...projectData, id: 2, title: 'Project 2', status: PROJECT_STATUS.COMPLETED,},
    {...projectData, id: 3, title: 'Project 3'},
    {...projectData, id: 4, title: 'Project 4 (closed)', status: PROJECT_STATUS.CLOSED},
]


export const subTask = {
    taskId: 1,
    SubTaks: [
        {
            description: 'Description for Subtask 1:',
            finished: false
        },
        {
            description: 'Description for Subtask 2',
            finished: false
        },
        {
            description: 'Description for Subtask 3',
            finished: true
        },
        {
            description: 'Description for Subtask 4',
            finished: true
        }
    ]
}



export const taskListsByProjectId =[
    {
        id: 1,
        tasks: [...tasksListData]
    },
    {
        id: 2,
        tasks: [...tasksListData2]
    },
    {
        id: 3,
        tasks: [...tasksListData]
    },
    {
        id: 4,
        tasks: [...tasksListData2]
    }
]