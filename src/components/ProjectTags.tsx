import { Space, Tag } from "antd"

const ProjectTags= ( {tags} : {tags: string[]}) => {
    
    return <Space><Tag bordered={tags?false:true}>Tag 1</Tag><Tag bordered={false}>Tag 2</Tag></Space>
}

export default ProjectTags