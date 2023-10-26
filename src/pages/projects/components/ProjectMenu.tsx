import { useLocation, useNavigate } from "react-router-dom";
import { Segmented } from "antd"
import './style.css'



const PROJECT_PAGES = {
    discussion: "Discussion",
    tasks: "Tasks",
    timelines: "Timeline",
    files: "Files",
    overview: "Overview"
}



const ProjectMenu = ( {projectId}: {projectId: number} ) => {

    const location = useLocation();
    
    function handleChange(value: (string | number)) {
        navigate(`/projects/${projectId}/${value}`);
        
    }

    // Obtiene la ruta seleccionada actual
    const selectedKey = location.pathname.split("/")[3];    

    const navigate = useNavigate()
    return <Segmented options={[PROJECT_PAGES.overview,
                                PROJECT_PAGES.tasks,
                                //PROJECT_PAGES.timelines,
                                //PROJECT_PAGES.files,
                                //PROJECT_PAGES.discussion,
                                
                                ]} 
        onChange={handleChange}
        defaultValue ={PROJECT_PAGES.overview}
        value = {selectedKey}
        block
        className="project-menu"
        style={{backgroundColor: "transparent", width: "100%", maxWidth: "500px"}}
     
    />
}

export default ProjectMenu;