import { Button, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from '@ant-design/icons';
import { setFormVisible } from "../../../redux/projectSlice";

const NewProjectButton: React.FC = () => {

  

    const dispatch = useDispatch();
    
    return <>
    <Tooltip title="New Project">
        <Button type="primary" 
        onClick={()=>dispatch(setFormVisible(true))}
        icon={<PlusOutlined />} >
            New Project
        </Button>
    </Tooltip>

    </>
}



    

export default NewProjectButton