import { Button, Tooltip } from "antd";
import {
    PlusOutlined,
} from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { setIsCreating, setTask, setVisible } from "../../../redux/taskSlice";

const NewTaskButton: React.FC = () => {

    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setTask(0))
        dispatch(setIsCreating(true))
        dispatch(setVisible(true))
        
        
    }
    return <Tooltip title="New Task">
        <Button type="primary" 
        onClick={handleClick}
        icon={<PlusOutlined />} >
            New Task
        </Button>
    </Tooltip>
}


export default NewTaskButton;