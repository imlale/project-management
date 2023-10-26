import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { API_KEY } from '../secret/googleAPI'

import { Layout, App as AntdApp } from 'antd';

//Pages
import Projects from './pages/projects';
import Dashboard from './pages/dashboard';
import Calendar from './pages/calendar';
import Login from './pages/login';

//Images
import ProjectsList from './pages/ProjectsList';
import { GeneralStoreProvider } from './redux/store';
import { PMConfigProvider, PMSider } from './PMConfig';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App: React.FC = () => {


  return (
    <GoogleOAuthProvider clientId={API_KEY} >
      <GeneralStoreProvider>
        <PMConfigProvider>

          <AntdApp>
            <Router>
              <Layout style={{ minHeight: '100vh' }}>
                <PMSider />

                <Routes>
                  <Route path="/dashboard" Component={Dashboard} />
                  <Route path="/projects/:projectId/*" Component={Projects} />
                  <Route path="/projects/" Component={ProjectsList} />
                  <Route path="/calendar" Component={Calendar} />
                  <Route path="/login" Component={Login} />
                  <Route path="*" element={<Login />} />
                </Routes>

              </Layout>
            </Router>
          </AntdApp>
        </PMConfigProvider>
      </GeneralStoreProvider>
    </GoogleOAuthProvider>
  );
};

export default App;