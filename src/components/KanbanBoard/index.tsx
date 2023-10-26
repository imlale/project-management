import { Badge, Card, Col, Layout, Row, Skeleton, Space, message, } from "antd";
import KanbanTask from "./KanbanTask";

import { TASK_STATUS } from "../../models/statusParams";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import type { Person, Task } from "../../models/projectTypes";
import { useGetTasksByProjectQuery, useUpdateTaskMutation } from "../../services/apiTaskSlice";
import { useDispatch } from "react-redux";
import { setTaskList } from "../../redux/taskListSlice";
import interact from 'interactjs';


//Simulamos una promesa para darle un tiempo de carga y no bloquee la interfaz.
const getBoardContent = (tasksListData: Task[]) => {
    

            const todoTasks = tasksListData.filter((task) => {
                return task.status.localeCompare(TASK_STATUS.TODO) === 0
            })
            const inProgressTaks = tasksListData.filter((task) => {
                return task.status.localeCompare(TASK_STATUS.IN_PROGRESS) === 0
            })
            const inReviewTasks = tasksListData.filter((task) => {
                return task.status.localeCompare(TASK_STATUS.IN_REVIEW) === 0
            })
            const completeTasks = tasksListData.filter((task) => {
                return task.status.localeCompare(TASK_STATUS.COMPLETE) === 0
            })


            const taskList = {
                [TASK_STATUS.TODO]: todoTasks,
                [TASK_STATUS.IN_PROGRESS]: inProgressTaks,
                [TASK_STATUS.IN_REVIEW]: inReviewTasks,
                [TASK_STATUS.COMPLETE]: completeTasks,
            }

            const boardContent = Object.entries(taskList).map(([key, value]) => (
                <Col span={6} key={key} id={key} className="cards-container"
                    style={{ minHeight: '10vh' }}
                    >
                    <Row style={{ height: "100%", alignContent: "start" }} gutter={[24, 12]}>
                        <Col span={24}>
                            <Space>
                                <h3>{key}</h3>
                                <Badge count={value.length} showZero color="white" style={{ color: '#000' }} />
                            </Space>
                        </Col>

                        {value.map((task) => {

                            return <Col key={task.id} span={24}><KanbanTask taskData={task} /></Col>
                        })}


                    </Row>
                </Col>
            ))
                        
            return boardContent


}

const KanbanBoard = () => {

    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(true);
    const [boardContent, setBoardContent] = useState([] as React.ReactNode[]);
    const { tasksListData, filters } = useSelector((state: RootState) => state.taskList);
    const { projectData } = useSelector((state: RootState) => state.project)
    const { data, isSuccess, isLoading: isLoadingQuery } = useGetTasksByProjectQuery(projectData.id)
    const [updateTask] = useUpdateTaskMutation()

    const cargaInicial = useRef(true);
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'processing';


    const [statusData, setStatusData] = useState({taskId: 0, newStatus: ''});


    useEffect(() => {


        if (tasksListData && isSuccess && !isLoadingQuery) {
            //setLoading(true)
            let filteredData = filters.assignees.length > 0 ? tasksListData.filter((task) => {
                return task.assignees.find((assignee: Person) =>
                    filters.assignees.find((id) => id === assignee.id))
            })
                : tasksListData

            const res = getBoardContent(filteredData)
                    setBoardContent(res)
                    setLoading(false)

        }

    }, [filters])

    useEffect(() => {
        if (tasksListData && isSuccess) {
            //setLoading(true)            
            if(statusData.taskId !==0){
                const newListaData = tasksListData.map((task)=>{
                    if(task.id === statusData.taskId){
                        return {...task, status: statusData.newStatus}
                    }
                    return task
                })
                const res = getBoardContent(newListaData)
                    setBoardContent(res)
                    setLoading(false)
                    setStatusData({taskId: 0, newStatus: ''})
                    dispatch(setTaskList(newListaData))
            }            
        }

    }, [statusData])

    useEffect(() => {
        if (isSuccess) {
            dispatch(setTaskList(data))
            const res = getBoardContent(data)
            setBoardContent(res)
            setLoading(false)

        }
        return () => { dispatch(setTaskList([])) }
    }, [data])

    useEffect(() => {

        if (cargaInicial.current) {
            cargaInicial.current = false;
            interact('.cards-container')
                .dropzone({
                    ondrop: function (event) {
                        const dragged = event.relatedTarget
                        const dropzone = event.target
                        dropzone.style.border = '0'
                        
                        if (dragged.dataset.status === dropzone.id) {
                            dragged.style.transform = 'translate(0,0)'
                        } else {
                            const copiaElemento = dragged.cloneNode(true);
                            copiaElemento.style.transform = 'translate(0,0) rotate(0)'
                            copiaElemento.style.marginLeft = '12px'
                            //const child = dropzone.children[0].appendChild(copiaElemento)
                            dragged.style.opacity = "0"
                                                      
                            
                            const newTaskData = { status: dropzone.id }
                            setStatusData({taskId: dragged.id, newStatus: dropzone.id })
                            messageApi.open({
                                key,
                                type: 'loading',
                                content: 'Updating status...',
                            });

                            updateTask({ taskId: dragged.id, data: newTaskData })
                                .unwrap()
                                .then(() => {
                                    messageApi.open({
                                        key,
                                        type: 'success',
                                        content: 'Updated!',
                                        duration: 1,
                                    });
                                })
                                .catch(() => { messageApi.error('Error') })
                                .finally(()=>{
                                    dragged.style.zIndex = 0   
                                   // dropzone.children[0].removeChild(child)                                   
                                })
                        }
                    },
                    ondragenter: function (event) {
                        const dropzoneElement = event.target
                        event.preventDefault()
                        dropzoneElement.style.border = '1px dashed #aaa'
                        dropzoneElement.style.borderRadius = '15px'
                    },
                    ondragleave: function (event) {
                        const dropzoneElement = event.target
                        event.preventDefault()
                        dropzoneElement.style.border = '0'
                    }
                })

                
        }else{

            return () => {
                interact('.cards-container').unset()
            }
        }

        


    }, [])



    return <Layout id="kanbanboard" style={{ width: "1024px", }}>
        {contextHolder}
        <Row gutter={[8, 8]} style={{ width: "100%" }}>
            {isLoading && <BoardSkeleton />}
            {boardContent}
        </Row>


    </Layout>
}



const BoardSkeleton = () => {

    const fakeList = Object.values(TASK_STATUS)
    return fakeList.map((value, i) => (
        <Col span={6} key={i}>
            <Row gutter={[24, 12]}>
                <Col span={24}>
                    <Space>
                        <h3>{value}</h3>
                        <Badge count={0} showZero color="white" style={{ color: '#000' }} />
                    </Space>
                </Col>

                {fakeList.slice(2).map((i) => {

                    return <Col key={i} span={24}><Card
                        title={<Skeleton.Input active={true} />}
                        loading={true}></Card></Col>
                })}

            </Row>
        </Col>
    ))
}



export default KanbanBoard;