//State
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { setIsCreating, setTask, setTaskData, setVisible } from '../../redux/taskSlice';
import { useCreateTaskMutation, useGetTaskByIdQuery, useUpdateTaskMutation } from '../../services/apiTaskSlice';
import { useEffect, useState } from 'react';

//Components

import { Button, Col, DatePicker, Divider, Drawer, Form, FormInstance, Image, Input, Row, Select, Space, Typography, App, Skeleton } from 'antd';
import StatusBadge from '../../styled-components/StatusBage';
import TaskTags from '../TaskTags';
import AvatarPlusName from '../../styled-components/AvatarPlusName';
import AssigneesSelect from './AssigneesSelect';
import ImageUpload from './ImageUpload';
import SubTasks from './SubTasks';

//Utilities
import { formatDateToYYYYMMDD, timelineFormatDate } from '../../utilities/Date';
import dayjs from 'dayjs';
import { TASK_STATUS } from '../../models/statusParams';
import type { Person, Task } from '../../models/projectTypes';
import { useCreateSubTaskByTaskMutation } from '../../services/apiSubTasksSlice';
import { useProjectPermissions } from '../../hooks/useProjectPermissions';





const TaskDetail: React.FC = () => {
    const { visible, isCreating } = useSelector((state: RootState) => state.task)
    const { projectData } = useSelector((state: RootState) => state.project)
    const { userProfile } = useSelector((state: RootState) => state.user)
    const { taskData } = useSelector((state: RootState) => state.task)
    const [updateTask, { isLoading: isLoadingUpdate }] = useUpdateTaskMutation();
    const [createTask, { isLoading: isLoadingCreate }] = useCreateTaskMutation();
    const [createSubTask] = useCreateSubTaskByTaskMutation();
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(false);
    const [form] = Form.useForm();
    const { message } = App.useApp()
    const projectPermissions = useProjectPermissions()


    const onClose = () => {
        form.resetFields()
        dispatch(setVisible(false))
        dispatch(setIsCreating(false))
        setEditable(false)
        dispatch(setTaskData({}))

    };
    const handleEdit = () => {
        if (!projectPermissions.editable) {
            message.info(projectPermissions.message)
            return
        }
        setEditable(true)
    }
    const cancelEdit = () => {
        setEditable(false)
        form.resetFields()
        dispatch(setIsCreating(false))
    }
    const handleValidations = () => {
        form.setFieldValue('assignees', taskData.assignees)
        form.validateFields()
            .then(handleSave)
            .catch(() => message.error('Complete the form'))
    }
    const handleSave = () => {

        const { title, description, status, timeline } = form.getFieldsValue()
        const timelineFromated = {
            startDate: formatDateToYYYYMMDD(timeline[0]),
            endDate: formatDateToYYYYMMDD(timeline[1])
        }

        let updatedTask: Task = { ...taskData, title, description, status, timeline: timelineFromated }
        updatedTask.assignees = taskData.assignees ?? []
        if (isCreating) {
            updatedTask = {
                ...updatedTask, projectId: projectData.id, createdBy: {
                    "id": userProfile.id,
                    "name": userProfile.name,
                    "avatar": userProfile.avatar
                },
            }
            createTask(updatedTask).unwrap()
                .then((payload) => {
                    dispatch(setTask(payload.id))
                    createSubTask({ taskId: payload.id, subTasks: [] })
                        .unwrap()
                        .then(cancelEdit)
                        .catch(() => {
                            message.error("SubTask not created")

                        })

                }).catch(() => {
                    message.error("Task not created")
                })


        } else if (editable) {
            updateTask({ taskId: updatedTask.id, data: updatedTask })
                .then(() => cancelEdit())
        }
        //cancelEdit();
    }


    useEffect(() => {
        setEditable(isCreating)
    }, [isCreating])


    return (
        <>
            <Drawer
                title={projectData.title}
                width={720}
                onClose={onClose}
                open={visible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={editable ? isCreating ? onClose : cancelEdit : onClose}>Cancel</Button>
                        {projectPermissions.editable && <Button onClick={editable ? handleValidations : handleEdit} type="primary">
                            {editable ? "Save" : "Edit"}
                        </Button>}
                    </Space>
                }
            >
                {visible && <Form id="task-form" form={form} disabled={isLoadingUpdate || isLoadingCreate || !projectPermissions.editable}>
                    {(editable) ? <TaskDescriptionEditable form={form} /> : <TaskDescription />}
                </Form>}

            </Drawer>
        </>
    );
};



const TaskDescription = () => {
    const taskId = useSelector((state: RootState) => state.task.taskId);

    const { data: taskData, isLoading, error } = useGetTaskByIdQuery(taskId, {
        skip: (!taskId || taskId <= 0), //omit query when...
    });

    const visible = useSelector((state: RootState) => state.task.visible);
    if (!visible) return

    if (isLoading) return <div>
        <Row>
            <Skeleton active />
        </Row>
        <Row>
            <Skeleton active />
        </Row>
        <Row>
            <Skeleton active />
        </Row>
    </div>
    if (error || !taskData) return <div>Error</div>

    return <div style={{ padding: "1em " }}>
        <Row>
            <Col>
                <TaskTags tags={taskData.tags} />
            </Col>
        </Row>
        <Row >
            <Col span={24}>
                <h1>{taskData.title}</h1>
                <div style={{ margin: "1em 0", width: "100%" }}>
                    <Typography.Paragraph>{taskData.description}</Typography.Paragraph>
                </div>
            </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 24]}>
            <Col span={6}>
                Created By
            </Col>
            <Col span={18}>
                <AvatarPlusName name={taskData.createdBy.name} avatar={taskData.createdBy.avatar} />
            </Col>

            <Col span={6}>
                Assigned To
            </Col>
            <Col span={18}>
                {taskData.assignees.map((item: Person, index: number) => {
                    return <AvatarPlusName key={index} name={item.name} avatar={item.avatar} />
                })}
            </Col>

            <Col span={6}>
                Timeline
            </Col >
            <Col span={18}>
                {`${timelineFormatDate(taskData.timeline.startDate)} to ${timelineFormatDate(taskData.timeline.endDate)}`}
            </Col>

            <Col span={6}>
                Status
            </Col >
            <Col span={18}>
                <StatusBadge status={taskData.status} />
            </Col>


            <Col span={24} style={{
                display: "flex", maxHeight: "400px",
                overflow: "hidden", alignItems: "center",
            }}>
                <Image
                    width={"100%"}
                    src={taskData.attachedImage}
                />
            </Col>

            <Col span={24} >
                <SubTasks taskId={taskData.id} />
            </Col>
        </Row>
    </div>

}



const TaskDescriptionEditable = ({ form }: { form: FormInstance<any> }) => {


    const dispatch = useDispatch()
    const { taskId } = useSelector((state: RootState) => state.task);
    const { data: taskData, isLoading, error } = useGetTaskByIdQuery(taskId, {
        skip: (!taskId || taskId <= 0), //omit query when...
    });
    const { message } = App.useApp()

    useEffect(() => {
        if (taskData && taskData.id !== 0) { //si no es creación
            form.setFieldsValue({
                title: taskData.title, description: taskData.description,
                timeline: [dayjs(taskData.timeline.startDate, 'YYYY-MM-DD'), dayjs(taskData.timeline.endDate, 'YYYY-MM-DD')],
                status: taskData.status
            })
            dispatch(setTaskData(taskData))
        }

    }, [taskData, taskId])

    if (isLoading) return <div>
        <Row>
            <Skeleton active />
        </Row>
        <Row>
            <Skeleton active />
        </Row>
        <Row>
            <Skeleton active />
        </Row></div>
    if (error) message.error("Error loading task")

    return <div style={{ padding: "1em " }}>
        <Row>
            <Col>
                <TaskTags tags={taskData?.tags ?? []} editable={true} />
            </Col>
        </Row>
        <Row >
            <Col span={24}>
                <h1>
                    <Form.Item name="title" rules={[{ required: true, message: 'Please enter a Title' }]} >
                        <Input placeholder="Title" /*defaultValue={taskData.title ?? ''}*/ />
                    </Form.Item>
                </h1>
                <div style={{ margin: "1em 0", width: "100%" }}>
                    <Form.Item name="description" rules={[{ required: true, message: 'Please enter a Description' }]}>
                        <Input.TextArea placeholder="Description" rows={4} />
                    </Form.Item>
                </div>
            </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 24]}>
            <Col span={6}>
                Created By
            </Col>
            <Col span={18}>
                {taskData?.createdBy ? <AvatarPlusName name={taskData?.createdBy.name} avatar={taskData.createdBy.avatar} /> : 'me'}
            </Col>

            <Col span={6}>
                Assigned To
            </Col>
            <Col span={18}>
                <Form.Item name="assignees" rules={[{ required: true, message: 'Please select at least 1 assignee' }]}>
                    <AssigneesSelect assignees={taskData?.assignees ?? []} />
                </Form.Item>
            </Col>

            <Col span={6}>
                Timeline
            </Col >
            <Col span={18}>
                <Form.Item name="timeline" rules={[{ required: true, message: 'Please enter a timeline' }]}>
                    <DatePicker.RangePicker name="timeline"
                    //defaultValue={taskData.timeline ? [dayjs(taskData.timeline.startDate, 'YYYY-MM-DD'), dayjs(taskData.timeline.endDate, 'YYYY-MM-DD')] : [dayjs(), dayjs()]}
                    />
                </Form.Item>
            </Col>

            <Col span={6}>
                Status
            </Col >
            <Col span={18}>
                <Form.Item name="status" rules={[{ required: true, message: 'Please select a status' }]}>
                    <Select
                        //defaultValue={taskData.status ?? TASK_STATUS.TODO}
                        style={{ width: 120 }}
                        options={Object.values(TASK_STATUS).map((value) => {
                            return { label: value, value: value }
                        })}
                    />
                </Form.Item>
            </Col>


            <Col span={24} style={{
                display: "flex", maxHeight: "400px",
                overflow: "hidden", alignItems: "center",
            }}>
                <Form.Item name="attachedImageUrl">
                    <ImageUpload imageUrl={taskData?.attachedImage ?? ''} />
                </Form.Item>
            </Col>



            <Col span={24} >
                <SubTasks taskId={taskData?.id ?? 0} />
            </Col>
        </Row>
    </div>

}




export default TaskDetail;