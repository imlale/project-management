import { EyeOutlined, MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Card, Space, Dropdown, Tooltip, message, Popconfirm } from 'antd';
import TaskTags from '../TaskTags';
import { setTask } from '../../redux/taskSlice';
import interact from 'interactjs';






const { Meta } = Card;

//mocks
import { Task } from '../../models/projectTypes';
import { useDispatch } from 'react-redux';
import { useDeleteTaskMutation } from '../../services/apiTaskSlice';
import { useEffect, useRef } from 'react';




const KanbanTask = ({ taskData }: { taskData: Task }) => {


  const hasTags = taskData.tags && taskData.tags.length > 0
  const elementRef = useRef({} as HTMLDivElement);


  useEffect(() => {

    // Inicializa la interacción drag-and-drop en el elemento usando interact.js
    const position = { x: 0, y: 0 }
    interact(elementRef.current).draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: '#kanbanboard',        

        })
      ],
      listeners: {
        move(event) {
          position.x += event.dx
          position.y += event.dy
          
          event.target.style.transform =
            `translate(${position.x}px, ${position.y}px) rotate(8deg)`
          event.target.style.pointerEvents = 'none'
        },
        end(event) {
          position.x = 0
          position.y = 0
          event.target.style.transform = 'rotate(0)'
          event.target.style.pointerEvents = 'inherit'
          event.target.style.zIndex = 0        
          
        },
        start(event) {   
          event.target.style.pointerEvents = 'inherit'
          event.target.style.zIndex = 1000             
          event.preventDefault()
        }
      }
    })
  

    //return () => interact(elementRef.current).unset();
  }, []);


  const dispatch = useDispatch();

  return <Card hoverable
    draggable
    ref={elementRef}
    data-status ={taskData.status}
  
    id={taskData.id.toString()}
    headStyle={{ padding: "0 .8rem", borderBottom: 0 }}
    bodyStyle={{ padding: "0 .8rem .5rem .8rem" }}

    style={{ width: "100%", borderRadius: "16px", maxWidth: '250px' }}
    extra={<TaskCardMenu id={taskData.id} />}
    onDoubleClick={() => dispatch(setTask(taskData.id))}
    actions={[
      /*<CommentOutlined key="comments" />,
      <PaperClipOutlined key="attached" />,*/
      <EyeOutlined key="view" onClick={() => dispatch(setTask(taskData.id))} />, '',

      <Avatar.Group size={'small'} maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
        {taskData.assignees.map((assignee, index) => (
          <Tooltip key={index} title={assignee.name}>
            <Avatar src={assignee.avatar} />
          </Tooltip>
        ))}
      </Avatar.Group>

    ]}
    title={hasTags ? <TaskTags quantity={2} tags={taskData.tags} />
      : <div style={{ cursor: 'pointer' }}
        onClick={() => dispatch(setTask(taskData.id))}>{taskData.title}</div>}

  >
    <Meta
      style={{ cursor: 'pointer' }}
      title={hasTags && <div onClick={() => dispatch(setTask(taskData.id))}>{taskData.title}</div>}
      description={taskData.attachedImage && <TaskImage taskData={taskData} dispatch={dispatch} />}
    />

  </Card>

}

const TaskImage = ({ taskData, dispatch }: { taskData: Task, dispatch: any }) => {
  return <div onClick={() => dispatch(setTask(taskData.id))} style={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center", overflow: 'hidden' }}>
    <img draggable={false} width={"100%"}
      alt={taskData.title}
      src={taskData.attachedImage}
    />
  </div>
}


const getItems = ({ id, viewTaksDetail, handeDeleteTask }: { id: number, viewTaksDetail: (id: number) => void, handeDeleteTask: (id: number) => void }): MenuProps['items'] => [

  {
    label: <a onClick={() => viewTaksDetail(id)}>View</a>,
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: <Popconfirm
      title="Delete the Task"
      description="Are you sure to delete this task?"
      onConfirm={() => handeDeleteTask(id)}
      onCancel={() => { }}
      okText="Yes"
      cancelText="No">Delete</Popconfirm>,
    key: '1',
  },
];


const TaskCardMenu = ({ id }: { id: number }) => {

  const [deleteTask] = useDeleteTaskMutation()
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'deleting';
  const viewTaksDetail = (id: number) => {
    dispatch(setTask(id));
  }

  /*const deleteTask = (id: number) => {
    alert(`delete ${id}`);
  }*/

  const handeDeleteTask = (id: number) => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Deleting...',
    });
    deleteTask(id).unwrap()
      .then(() => {
        messageApi.open({
          key,
          type: 'success',
          content: 'Deleted!',
          duration: 2,
        });
      })
      .catch(() => {
        messageApi.open({
          key,
          type: 'error',
          content: 'Error!',
          duration: 2,
        });
      })
  }

  const taskOptions = {
    id: id,
    viewTaksDetail,
    handeDeleteTask

  }



  const items = getItems(taskOptions)
  return (<>{contextHolder}
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space style={{ padding: "5px" }}>
          <MoreOutlined />
        </Space>
      </a>
    </Dropdown>
  </>
  )
}
  ;


export default KanbanTask;