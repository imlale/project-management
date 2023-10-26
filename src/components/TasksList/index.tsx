import React, { useEffect, useState } from 'react';
import { Button, Layout, Popconfirm, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';


import { Person, Task } from '../../models/projectTypes';
import { setTask } from '../../redux/taskSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDeleteTaskMutation, useGetTasksByProjectQuery } from '../../services/apiTaskSlice';
import { setTaskList } from '../../redux/taskListSlice';


const getColumns = (viewTaksDetail: (id: number) => void, handeDeleteTask: (id: number) => void): ColumnsType<Task> => [

  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (_, { id, title }) => (
      <a onClick={() => viewTaksDetail(id)}>{title}</a>
    )
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Assignees',
    dataIndex: 'assignees',
    key: 'assignees',
    render: (_, { assignees }) => (
      <>
        {assignees.map((assignee, index) => (
          <Tag key={index}>{assignee.name}</Tag>
        ))}
      </>
    )
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags&&tags.map((tag, index) => {
          return <Tag key={index}>{tag}</Tag>
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, { id }) => (
      <Space key={id} size="middle">
        <Button onClick={() => viewTaksDetail(id)}>View </Button>
        <Popconfirm
          title="Delete the Task"
          description="Are you sure to delete this task?"
          onConfirm={() => handeDeleteTask(id)}
          onCancel={() => { }}
          okText="Yes"
          cancelText="No">
            <Button danger >Delete</Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const TasksList: React.FC = () => {
  const dispatch = useDispatch();
  const { tasksListData, filters } = useSelector((state: RootState) => state.taskList);
  const { projectData } = useSelector((state: RootState) => state.project)
  const { data, isSuccess, isLoading } = useGetTasksByProjectQuery(projectData.id)
  const [firstLoad, setFirstLoad] = useState(true)
  const [deleteTask] = useDeleteTaskMutation()
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTaskList(data))
      setFirstLoad(false)
    }
  }, [data])



  const getDataSource = () => {

    return filters.assignees.length > 0 ? tasksListData.filter((task) => {
      return task.assignees.find((assignee: Person) =>
        filters.assignees.find((id) => id === assignee.id))
    })
      : tasksListData
  }

  const key = 'deleting';
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
  const viewTaksDetail = (id: number) => {
    dispatch(setTask(id));
  }

  const columns = getColumns(viewTaksDetail, handeDeleteTask);
  //if(firstLoad) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  if(firstLoad) return <EmptyTable/>
  return <Layout style={{ minWidth: "1024px", width: "100%", marginTop: "20px" }}>
    {contextHolder}
    
    <Table columns={columns} dataSource={getDataSource()} rowKey={task => task.id}
      pagination={false} loading={isLoading}
    />
  </Layout>

};

const EmptyTable = ()=>{
  return <Layout style={{ minWidth: "1024px", width: "100%", marginTop: "20px" }}>
        
  
  <Table   rowKey={task => task.id}
    pagination={false} loading={true}   
  />
</Layout>

}

export default TasksList;