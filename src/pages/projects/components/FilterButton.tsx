import React from 'react';
import { Button, Checkbox, Col, Dropdown, Row, Space, Tooltip } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Person } from '../../../models/projectTypes';
import { filterListByMember } from '../../../redux/taskListSlice';




const FilterButton: React.FC = () => {
  const breackPoint = useSelector((state: any) => state.screen.windowSize);
  const {projectData} = useSelector((state: any) => state.project);
  const dispatch = useDispatch();


  function onChange(event: any) {
    dispatch(filterListByMember(event as number[]))
  }

  const items = [{
    key: 1,
    label: <Checkbox.Group
      onChange={(e) => onChange(e)}
    >
      <Row>
        {projectData?.teamMembers?.map((member: Person) => 
          <Col key={member.id} span={12} style={{overflow: 'hidden'}}>
            <Checkbox value={member.id}>{member.name.split('@')[0]}</Checkbox>
          </Col>
        )}
      </Row>
    </Checkbox.Group>
  }]

  return <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <Tooltip title="Filters">
          <Button icon={<FilterOutlined />}>{!breackPoint && "Filters"}</Button>
        </Tooltip>
      </Space>
    </a>
  </Dropdown>
};

export default FilterButton;