import { ConfigProvider, Col, Layout, Row, Grid } from "antd"

//image
import viteLogo from './assets/react.svg';
import SideMenu from './components/SideMenu';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWindowSize } from "./redux/screenSlice";
import useAuth from "./hooks/useAuth";
import UserMenu from "./components/UserMenu";


const { Sider } = Layout;

export const PMConfigProvider = ({ children }: { children: React.ReactNode }) => {
  
  return <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#0D25FF',
        borderRadius: 2,
        fontFamily: 'Sen, sans-serif',
        colorBgLayout: '#E1E2EA',
        // Alias Token
        colorBgContainer: '#FFFFFF',
      },
      components: {
        Badge: {
          statusSize: 10
        },
        Card: {
          actionsBg: 'transparent',
        },
        Layout: {
          headerPadding: '0 16px'
        },
        Segmented: {
          itemActiveBg: 'transparent',
          itemSelectedColor: '#0d25ff',
          borderRadius: 50,
          borderRadiusSM: 50,
          borderRadiusLG: 50,
        },
        Button: {
          borderRadius: 50
        }
      }
    }}
  >
    {children}
  </ConfigProvider>
}


export const PMSider = () => {

  const {useBreakpoint} = Grid
  const screens = useBreakpoint();
  const dispatch = useDispatch()
  const breackPoint = useSelector((state: any) => state.screen.windowSize);
  const {isLogged} = useAuth()
  const [collapsed, setCollapsed] = useState(true); 
  
  useEffect(()=>{
    dispatch(setWindowSize(!screens.md))

  }, [screens])

  return isLogged&&<Sider theme="light" collapsible collapsed={collapsed}
  trigger={<UserMenu/>}

  collapsedWidth={breackPoint ? "0" : "64px"}
  zeroWidthTriggerStyle={{ top : "80%" }}
 
    onCollapse={(value) => setCollapsed(value)}
    style={breackPoint ? { position: "absolute", zIndex: "999", height: "100%" } : {}}>
    <Row justify="center">
      <Col style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <img src={viteLogo} alt="vite logo" />
      </Col>
    </Row>


    <SideMenu />
  </Sider>
}
