import { Col, Layout, Row, Segmented, Space } from "antd";

import TaskViewModeProvider, { useTaskViewContext } from "./contexts/TaskViewModeProvider";


import {
    AppstoreOutlined,
    BarsOutlined,


} from '@ant-design/icons';
//import KanbanBoard from "../../components/KanbanBoard";
import React, { Suspense, lazy } from "react";
import TaskDetail from "../../components/TaskDetail";
import TasksList from "../../components/TasksList";
import { useSelector } from "react-redux";
import FilterButton from "./components/FilterButton";
import NewTaskButton from "./components/NewTaskButton";
import { useProjectPermissions } from "../../hooks/useProjectPermissions";
import { RootState } from "../../redux/store";


const KanbanBoard = lazy(() => import("../../components/KanbanBoard"))
const TASK_VIEW_MODE = {
    LIST: 'List',
    KANBAN: 'Kanban'
}

const Tasks: React.FC = () => {
    const { projectData } = useSelector((state: RootState) => state.project)

    if (!projectData.id) return <>Loading Project Data...</>

    // const { taskViewMode } = useTaskViewContext();
    return (
        <TaskViewModeProvider>
            <Layout style={{
                backgroundColor: "transparent", height: "100%", width: "100%",
                position: "absolute", overflow: "hidden"
            }}>
                <Row style={{
                    justifyContent: 'space-between', marginBottom: "8px", backgroundColor: "transparent"
                    , padding: "16px 16px 0 16px"
                }}>
                    <Col>
                        <TaskViewController />
                    </Col>
                    <Col>
                        <TasksOptions />
                    </Col>
                </Row>
                <Row style={{
                    paddingLeft: "16px", position: "relative",
                    overflow: "auto", height: "100%", width: "100%"
                }}>
                    <Col style={{width: "99%"}}>
                        <TasksDisplay />
                    </Col>
                </Row>
            </Layout>
            <TaskDetail />
        </TaskViewModeProvider>
    )
};

const TasksDisplay: React.FC = () => {
    const { taskViewMode } = useTaskViewContext();
    return <>
    <Suspense fallback={<h2>Still Loading…</h2>}>
        {taskViewMode === TASK_VIEW_MODE.KANBAN ? <KanbanBoard /> : <TasksList />}
        </Suspense>
    </>
}

const TasksOptions: React.FC = () => {
    const { editable } = useProjectPermissions()
    return <Space>
        {editable && <NewTaskButton />}
        <FilterButton />
    </Space>
}

const TaskViewController: React.FC = () => {
    const { taskViewMode, setTaskViewMode } = useTaskViewContext();
    const breakpoint = useSelector((state: any) => state.screen.windowSize);
    return (
        <Space>
            <Segmented
                defaultValue={TASK_VIEW_MODE.KANBAN}
                value={taskViewMode}
                onChange={(value) => setTaskViewMode(value.toString())}
                options={[
                    {
                        label: !breakpoint && TASK_VIEW_MODE.KANBAN,
                        value: TASK_VIEW_MODE.KANBAN,
                        icon: <AppstoreOutlined />,
                    },
                    {
                        label: !breakpoint && TASK_VIEW_MODE.LIST,
                        value: TASK_VIEW_MODE.LIST,
                        icon: <BarsOutlined />,
                    },

                ]}
            />
        </Space>
    );
}



export default Tasks;