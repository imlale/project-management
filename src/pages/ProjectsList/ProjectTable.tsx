import React from 'react';
import { Button, Popconfirm, Row, Space, Table, App } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useDeleteProjectMutation, useGetProjectsQuery } from '../../services/apiSlice';
import { Project } from '../../models/projectTypes';
import { ProjectStatusBadge } from '../../styled-components/StatusBage';
import { useDispatch } from 'react-redux';
import { setFormVisible, setProjectIdEditable } from '../../redux/projectSlice';
import useAuth from '../../hooks/useAuth';

interface DataType {
    key: number;
    name: string;
    status: string;
    description: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={`./${record.key}/Overview`}>{text}</Link>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => <ProjectStatusBadge status={text} />
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button><Link to={`./${record.key}/Overview`}>View</Link> </Button>                
                <ProjectEdit id={record.key} />
                <ProjectDeleteButton id={record.key} />
            </Space>
        ),
    },
];

const getData = (projects: Project[]): DataType[] => {
    
    return projects.map((project) => ({
        key: project.id,
        name: project.title,
        status: project.status,
        description: project.description.substring(0, 50) + "...",
        tags: project.tags?? [],
    }))
}


const ProjectTable: React.FC = () => {
    const {userIdString} = useAuth()
    const { data: projects, isLoading } = useGetProjectsQuery(userIdString);



    return <Row gutter={[24, 24]} style={{ height: '100%' }}>

        
        {<Table columns={columns} loading={isLoading} scroll={{ x: 1024, y: '100%' }}
            dataSource={projects ? getData(projects) : []} size="small"
            pagination = {{hideOnSinglePage: true, pageSize: 6 }} 
            rowClassName={(_, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
            style={{ height: '100%' }} />}

    </Row>
};

const ProjectDeleteButton = ({ id }: { id: number }) => {
    const [deleteProject] = useDeleteProjectMutation()
    const app = App.useApp()

    const handeDelete = (id: number) => {
        deleteProject(id)
            .unwrap()
            .then(() => app.message.success("Deleted"))
            .catch(() => app.message.success("Error Deleting"))
    }
    return <Popconfirm
        title="Delete the Project"
        description="Are you sure to delete this project?"
        onConfirm={() => handeDelete(id)}
        onCancel={()=>{}}
        okText="Yes"
        cancelText="No"
    >
        <Button danger >Delete</Button>
    </Popconfirm>
}

const ProjectEdit = ({ id }: { id: number }) => {
    const dispatch = useDispatch()
    const handeEdit = (id: number) => {
        dispatch(setProjectIdEditable(id))
        dispatch(setFormVisible(true))
    }
    return <Button onClick={() => handeEdit(id)}>Edit</Button>
}


export default ProjectTable;