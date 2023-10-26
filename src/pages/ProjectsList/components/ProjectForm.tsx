import { useEffect, useState } from 'react';

import { Alert, App, Button, Col, DatePicker, Drawer, Form, Input, InputNumber, Row, Select, Space } from 'antd';

import ProjectMembers from './ProjectMembers';
import { ProjectStatusBadge } from '../../../styled-components/StatusBage';
import { useCreateProjectMutation, useGetProjectByIdQuery, useUpdateProjectMutation } from '../../../services/apiSlice';
import { Project } from '../../../models/projectTypes';
import { PROJECT_STATUS } from '../../../models/statusParams';
import { formatDateToYYYYMMDD } from '../../../utilities/Date';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { setFormVisible, setProjectIdEditable, setTeamMembers } from '../../../redux/projectSlice';
import dayjs from 'dayjs';
import iconProfile from '../../../assets/img/icon-profile.png'



const ProjectForm = () => {
  //const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState(false)
  const [form] = Form.useForm();
  const [createProject, {isLoading: isLoadingCreate}] = useCreateProjectMutation()
  const [updateProject,  {isLoading: isLoadingUpdate}] = useUpdateProjectMutation()
  const app = App.useApp()
  const { userProfile } = useSelector((state: RootState) => state.user)

  const { formVisible, projectIdEditable, teamMembers } = useSelector((state: RootState) => state.project)
  const [editable, setEditable] = useState(false)
  const { data, isSuccess } = useGetProjectByIdQuery(projectIdEditable,
    { skip: projectIdEditable === 0 })
  const dispatch = useDispatch();
  



  useEffect(() => {
    if (projectIdEditable && isSuccess) {
      const values = {
        id: data.id,
        title: data.title,
        description: data.description,
        budget: data.budget,
        dateTime: [dayjs(data.startDate), dayjs(data.endDate)],
        status: data.status
      }
      form.setFieldsValue(values)
      dispatch(setTeamMembers(data.teamMembers.map((val) => val.id)))
      setEditable(true)
    }

  }, [data])
  const setOpen = (value: boolean) => {
    dispatch(setFormVisible(value))
    if (!value) {
      dispatch(setProjectIdEditable(0))
      setEditable(false)
      dispatch(setTeamMembers([]))
    }
  }

  const onClose = () => {
    setOpen(false);
    form.resetFields()
    setErrors(false)

  };

  const onSubmit = () => {
    form.setFieldValue('members', teamMembers)
    form.validateFields()
      .then(() => {
        setErrors(false)
        saveProject()
      })
      .catch(() => setErrors(true))
  }

  const onFinish = () => {

    onClose();
  }

  const saveProject = () => {
    
    const projectData = {

      id: data ? data.id : 0,
      title: form.getFieldValue("title"),
      description: form.getFieldValue("description"),
      status: data ? form.getFieldValue("status") : PROJECT_STATUS.CREATED,
      budget: form.getFieldValue("budget"),
      startDate: formatDateToYYYYMMDD(form.getFieldValue('dateTime')[0]),
      endDate: formatDateToYYYYMMDD(form.getFieldValue('dateTime')[1]),
      owner: {
        "id": userProfile.id,
        "name": userProfile.name,
        "avatar": userProfile.avatar
      },
      teamMembers: form.getFieldValue('members').map((value: string) => ({
        id: value,
        name: value,
        avatar: iconProfile
      })),
      tags: []
    } as Project
    if (!editable) {
      projectData.teamMembers = [...projectData.teamMembers]
    }

    if (editable) {
      updateProject(projectData).unwrap()
        .then(() => {
          app.message.success("Project Updated")
          form.submit()
        })
        .catch(() => app.message.error("Update Error"))
    }
    else {
      createProject(projectData).unwrap()
        .then(() => {
          app.message.success("Project Created")
          form.submit()
        })
        .catch(() => app.message.error("Creation Error"))
    }
  }

  return (


    <Drawer
      title="Create a new project"
      width={720}
      onClose={onClose}
      open={formVisible}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit} type="primary">
            {editable ? "Save" : "Submit"}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish} disabled={data?.status===PROJECT_STATUS.CLOSED || isLoadingCreate || isLoadingUpdate}>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            {errors && <Alert message="Please complete the form" type="error" />}
          </Col>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter a Title' }]}
            >
              <Input placeholder="Please enter a project title" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Status"

            >
              {editable ? <Select options={Object.values(PROJECT_STATUS).map((value) => ({ value, lable: value }))}
              disabled={data?.status===PROJECT_STATUS.CLOSED && false}/> :
                <ProjectStatusBadge status={'New'} />}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item 
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'please enter url description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter url description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dateTime"
              label="DateTime"
              rules={[{ required: true, message: 'Please choose the dateTime' }]}
            >
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                getPopupContainer={(trigger) => trigger.parentElement!}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="budget"
              label="Budget"
              rules={[{ required: true, message: 'Please enter a Budget' }]}
            >
              <InputNumber placeholder="Please enter a Budget" style={{ width: '100%' }}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}


              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="members"
              label="Members e-mails"
              style={{pointerEvents: data?.status===PROJECT_STATUS.CLOSED?'none':'all'}}
              rules={[{ required: true, message: 'Please choose Members' }]}
            >

              <ProjectMembers />
            </Form.Item>
          </Col>

        </Row>

      </Form>
    </Drawer>

  );
};

export default ProjectForm;