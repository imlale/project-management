import { Button, Checkbox, Col, Divider, Input, List, Progress, Row, Space, message } from "antd";
import { OrderedListOutlined } from '@ant-design/icons';
import { CloseOutlined } from '@ant-design/icons'


import { useEffect, useState } from "react";
import type { SubTask, SubTasks } from "../../models/projectTypes";
import {useGetSubTaskByTaskQuery, useUpdateSubTaskByTaskMutation}  from "../../services/apiSubTasksSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useProjectPermissions } from "../../hooks/useProjectPermissions";


function SubTasks({ taskId }: { taskId: number }) {
    
    const {data, isLoading, error} = useGetSubTaskByTaskQuery(taskId, {
        skip: !taskId, //omit query when...
    });
    const [updateSubTasks,  { isLoading: isUpdating }] = useUpdateSubTaskByTaskMutation()
    
    const projectPermissions = useProjectPermissions()
    const {isCreating} = useSelector((state: RootState)=> state.task)
    const [subTasksEditable, setSubTasksEditable] = useState<SubTask[]>([]);
    const completeTasks = subTasksEditable.filter((item) => item.finished).length;
    const [newTaskInput, setNewTaskInput] = useState("");
    const handeChange = (checked: boolean, value: number) => {
        if (!data || !data.subTasks) {
          return;
        }      
        const updatedTasks = [...data.subTasks];
        updatedTasks[value] = { ...updatedTasks[value], finished: checked };      
        sendUpdate({ id: data.id, taskId, subTasks:updatedTasks });
      };

    const handleRemove = (index: number) => {
        if(!projectPermissions.editable){
            return
        }

        if (!data || !data.subTasks) {
            return;
          } 
        const updatedTasks = data.subTasks.filter((_: any, i: number) => i !== index)
        sendUpdate({id: data.id, taskId, subTasks: updatedTasks})
    }

    const addTask = () => { 
        if (newTaskInput && data) {
            const tempSubTasks  = data?.subTasks?data.subTasks:[]
            const updatedTasks = [...tempSubTasks, { description: newTaskInput, finished: false }];
            sendUpdate({id: data.id, taskId, subTasks: updatedTasks})
            setNewTaskInput("");
        }
    }

    const sendUpdate = (data : SubTasks)  =>{
        updateSubTasks({id: data.id, taskId, updatedTasks: data.subTasks})
        .unwrap()
        .catch(()=>message.error("Error"))
    } 

    useEffect(()=> {   
        const temp = data
        setSubTasksEditable(temp?.subTasks ? temp.subTasks : []);
    }, [data, taskId])

    if(error && 'status' in error && error.status !== 404){   
         return <>Error, try to referesh </>
    }
    

    return <>
        <Divider />
        <Row gutter={[16, 24]}>
            <Col span={24}><h2>To Do:</h2></Col>
            <Col span={24}>
                <List 
                    style={{ padding: "14px" }}
                    header={<SubTaksHeader totalTaks={subTasksEditable.length} completeTasks={completeTasks} />}
                    itemLayout="horizontal"
                    dataSource={subTasksEditable}
                    bordered
                    loading={isLoading||isUpdating}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[<CloseOutlined 
                                     onClick={() => handleRemove(index)} />]}>
                            <List.Item.Meta
                                avatar={<Checkbox onChange={((e) => handeChange(e.target.checked, index))}
                                    defaultChecked={item.finished}
                                    checked={item.finished} />}
                                title={item.description}
                            />
                        </List.Item>
                    )}
                >

                    {isCreating? 'Save task first'
                    :<Space.Compact style={{ width: '100%', marginTop: "14px" }}>
                        <Input value={newTaskInput} style={{ marginLeft: "24px" }} 
                        placeholder="Add new Sub Task" 
                        onChange={(e) => setNewTaskInput(e.target.value)}
                        onPressEnter={addTask}/>
                        <Button style={{ marginRight: "24px" }} type="primary" onClick={addTask}>Add</Button>
                    </Space.Compact>}
                </List>

            </Col>
        </Row>
    </>
}

function SubTaksHeader({ totalTaks, completeTasks }: { totalTaks: number, completeTasks: number }) {

    const percentage = Math.floor((completeTasks / totalTaks) * 100);

    return <>
        <Row style={{ justifyContent: "space-between" }}>
            <Col >
                <OrderedListOutlined style={{ fontSize: "1.5rem" }} />
            </Col>
            <Col style={{ flexGrow: 1, marginLeft: "10px" }}>
                Subtasks
            </Col>
            <Col >
                {completeTasks} / {totalTaks}
            </Col>

        </Row>
        <Row>
            <Progress percent={percentage} showInfo={false} />
        </Row>
    </>
}

export default SubTasks;