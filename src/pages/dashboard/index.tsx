import React from 'react';
import { Progress, Space } from 'antd';
import useAuth from '../../hooks/useAuth';
import Login from '../login';

const Dashboard: React.FC = () => {
  if(!useAuth().isLogged) return <Login/> 
return  <>
  <h1>Dashboard</h1>
    <Space wrap>
    <Progress type="circle" percent={75} />
    <Progress type="circle" percent={70} status="exception" />
    <Progress type="circle" percent={100} />
  </Space>

    
  </>
};


export default Dashboard;