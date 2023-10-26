import { Badge } from "antd";

import { PROJECT_STATUS, TASK_STATUS } from "../models/statusParams";

const StatusBadge = ({status: status} : {status: string}) => {
    if(status.localeCompare(TASK_STATUS.TODO) === 0){
        return <Badge color="#108ee9" text={TASK_STATUS.TODO} />;
    }
    if(status.localeCompare(TASK_STATUS.IN_PROGRESS) === 0){
        return <Badge color="#f50" text={TASK_STATUS.IN_PROGRESS} />;
    }
    if(status.localeCompare(TASK_STATUS.IN_REVIEW) === 0){
        return <Badge color="#87d068" text={TASK_STATUS.IN_REVIEW} />;
    }
    if(status.localeCompare(TASK_STATUS.COMPLETE) === 0){
        return <Badge color="#108ee9" text={TASK_STATUS.COMPLETE} />;
    }
};
export default StatusBadge;


export const ProjectStatusBadge = ({status: status} : {status: string}) => {
    if(status.localeCompare(PROJECT_STATUS.COMPLETED) === 0){
        return <Badge status='success' text={PROJECT_STATUS.COMPLETED} />;
    }
    if(status.localeCompare(PROJECT_STATUS.CLOSED) === 0){
        return <Badge status='error' text={PROJECT_STATUS.CLOSED} />;
    }
    if(status.localeCompare(PROJECT_STATUS.ACTIVE) === 0){
        return <Badge status='processing' text={PROJECT_STATUS.ACTIVE} />;
    }
    if(status.localeCompare(PROJECT_STATUS.CREATED) === 0){
        return <Badge status='warning' text={PROJECT_STATUS.CREATED} />;
    }

        return <Badge status="default" text={status} />;
    
};