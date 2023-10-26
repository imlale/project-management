import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { PROJECT_STATUS } from "../models/statusParams"

const canEdit = () => {
    const {projectData} = useSelector((state: RootState) => state.project)
    return {
        editable: ![PROJECT_STATUS.CLOSED, PROJECT_STATUS.COMPLETED].includes(projectData.status),
        message: `Project Status ${projectData.status}`
    }
}

export const useProjectPermissions = () => {
    return canEdit()
}
