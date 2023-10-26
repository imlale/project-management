import { Col, Layout, Row, Skeleton, theme, App } from "antd";
import Tasks from "./Tasks";

import './index.css'
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Timeline from "./Timeline";
import Discussion from "./Discussion";
import ProjectMenu from "./components/ProjectMenu";

import Overview from "./Overview";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProject } from "../../redux/projectSlice";

import { useGetProjectByIdQuery } from "../../services/apiSlice";
import useAuth from "../../hooks/useAuth";
import Login from "../login";
import useLogout from "../../hooks/useLogout";





const { Header, Content } = Layout
const { useToken } = theme


const Projects: React.FC = () => {

    const { projectId } = useParams();
    const [error, setError] = useState(true)
    const { token } = useToken();
    const dispatch = useDispatch();
    const { data: projectData, isLoading, isSuccess, isError, error: getError } = useGetProjectByIdQuery(projectId)
    const navigate = useNavigate()
    const { message, notification } = App.useApp()
    const logOut = useLogout()
    useEffect(() => {

        if (isSuccess) {
            if (projectData.title) {
                dispatch(setProject(projectData))
                setError(false)
            } else {
                setError(true)
                notification.error({
                    message: `Unauthorized`,
                    description: 'You must be part of the team',
                    placement: 'topLeft',
                })
                navigate('/projects')
            }

        }
        if (isError) {
            if ('originalStatus' in getError) {
                if (getError.originalStatus === 401) {
                    message.error("Error: Unauthorized");
                    logOut();
                } else if (getError.originalStatus === 403) {
                    message.error("Error: Access Denied");
                } else if (getError.originalStatus === 404) {
                    message.error("Error: Project Not Found");
                } else {
                    message.error("An error occurred");
                }
            }
            navigate('/projects')

        }


    }, [projectData, isError])



    if (!useAuth().isLogged) return <Login redirect={false} />

    if (isLoading || error) return <ProjectSkeleton />

    return <Layout style={{ maxHeight: '100vh' }}>
        <Header style={{ background: token.colorBgContainer, height: "auto", lineHeight: "2.3em" }} >

            <Row gutter={[18, 6]}>
                <Col span={24}>

                    <h1>{projectData?.title + " - " + projectId?.padStart(8, '0')}</h1>
                    
                </Col>
                <Col span={24}>
                    <ProjectMenu projectId={projectId ? Number(projectId) : 0} />

                </Col>
            </Row>



        </Header>
        <Content style={{ overflow: "hidden", position: "relative" }} >
            {<Routes>
                <Route path={"/overview"} Component={Overview} />
                <Route path={"/tasks"} Component={Tasks} />
                <Route path="/timeline" Component={Timeline} />
                <Route path={"/discussion"} Component={Discussion} />
                <Route path="*" Component={Overview} />
            </Routes>}



        </Content>

    </Layout>;
}

const ProjectSkeleton = () => {
    const { token } = useToken();
    return <Layout style={{ maxHeight: '100vh' }}>
        <Header style={{ background: token.colorBgContainer, height: "auto", lineHeight: "2.3em" }} >
            <Skeleton active />
        </Header>


    </Layout>
}

export default Projects;

