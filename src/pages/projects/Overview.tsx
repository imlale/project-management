import React from 'react';
import { Descriptions, Layout, theme } from 'antd';
import type { DescriptionsProps } from 'antd';
import AvatarPlusName from '../../styled-components/AvatarPlusName';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { timelineFormatDate } from '../../utilities/Date';
import formatCurrency from '../../utilities/Currency';
import { ProjectStatusBadge } from '../../styled-components/StatusBage';
import { Project } from '../../models/projectTypes';

const getItems = (projectData: Project): DescriptionsProps['items'] => [
    {
        key: '1',
        label: 'Project Name',
        span: 2,
        children: projectData.title,
    },
    {
        key: '2',
        label: 'Status',
        span: 1,
        children: <ProjectStatusBadge status={projectData.status} />,
    },
    {
        key: '3',
        label: 'Description',
        span: 3,
        children: projectData.description,
    },
    {
        key: '4',
        label: 'Start Date',
        children: timelineFormatDate(projectData.startDate),
    },
    {
        key: '5',
        label: 'End Date',
        children: timelineFormatDate(projectData.endDate),
    },
    {
        key: '6',
        label: 'Budget',
        children: formatCurrency(Number(projectData.budget)),
    },
    {
        key: '7',
        label: 'Owner',
        span: 3,
        children: <AvatarPlusName avatar={projectData.owner.avatar} name={projectData.owner.name} />,
    },
    {
        key: '8',
        label: 'Team Members',
        span: 3,
        children: <div>
        {projectData.teamMembers.map((member, index) => (
            <AvatarPlusName key={index} avatar={member.avatar} name={member.name} />
        ))}
        </div>,
    },
];


const Overview: React.FC = () => {
    const {token} = theme.useToken()
    const {projectData} = useSelector((state: RootState) => state.project)
    

    if(!projectData.id) return <>Loading Project Data...</>

    const items = getItems(projectData)

    return <Layout style={{ height: "100%", width: "100%", overflow: "auto", position: "absolute", backgroundColor: token.colorBgContainer, }}>
        <Descriptions title="Basic Info" layout="vertical" bordered items={items}
            size='small'
            style={{ padding: "16px", height: "100%" }} />

        
    </Layout>


};



export default Overview;