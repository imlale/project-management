import { Col, Layout, Row, theme } from "antd";

import ProjectTable from "./ProjectTable";
import NewProjectButton from "./components/NewProjectButton";
import ProjectForm from "./components/ProjectForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useAuth from "../../hooks/useAuth";
import Login from "../login";


const { Header, Content } = Layout;


const ProjectsList: React.FC = () => {
    const { token } = theme.useToken();
    const {isLogged} = useAuth()

  
    const {formVisible} = useSelector((state: RootState)=> state.project) 

    if(!isLogged) return <Login/> 
    return <Layout style={{ maxHeight: '100vh' }} >
        <Header style={{ background: token.colorBgContainer, height: "auto", lineHeight: "2.3em" }} >

            <Row gutter={[18, 18]}>
                <Col span={24}>
                    <h1>Projects</h1>
                </Col>
              
            </Row>
        </Header>
        <Content  style={{ background: token.colorBgContainer }}>
        <Row gutter={18} style={{padding: "0 24px"}}>
            
            <Col span={24} style={{paddingBottom:16}}><NewProjectButton/></Col>
            <Col span={24}><ProjectTable/></Col>
            </Row>
        </Content >
        {formVisible&&<ProjectForm/>}
    </Layout>
}

export default ProjectsList;