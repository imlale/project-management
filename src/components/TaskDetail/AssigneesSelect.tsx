import { Select } from "antd"
import type { Person } from "../../models/projectTypes"
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import AvatarPlusName from "../../styled-components/AvatarPlusName";
import { useDispatch } from "react-redux";
import { setTaskData } from "../../redux/taskSlice";

const Option = Select.Option


const AssigneesSelect = ({assignees}: {assignees: Person[] }) => {
    const {projectData} = useSelector((state: RootState) => state.project);
    const dispatch = useDispatch()

    const handleChange = (e: number[])=>{
        
        const assignees = projectData.teamMembers.filter((member)=>{
            return e.includes(member.id)
        })
        dispatch(setTaskData({assignees}))
        
    }

    return <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="select assignees"
    defaultValue={assignees.map((item) => {
        return item.id
    })}
    onChange={handleChange}
    optionLabelProp="label"
    optionFilterProp="label"
>
    {projectData.teamMembers.map((member, index) => {
        return <Option key={index} value={member.id} label={member.name}>
            <AvatarPlusName name={member.name} avatar={member.avatar} />
        </Option>
    })}
    
    
</Select> 
}

export default AssigneesSelect;