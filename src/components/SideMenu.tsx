import { Link, useLocation } from 'react-router-dom';

//Ant components
import {
 //   CalendarOutlined,
  //  BellOutlined,
    FolderOpenOutlined,
   
//    CommentOutlined,
 //   BarChartOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Menu, type MenuProps } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import useLogout from '../hooks/useLogout';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    disabled?: boolean
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        disabled,
    } as MenuItem;
}

const getMenuItems = ({userProfile, logOut}: {userProfile: any, logOut: any}) : MenuItem[] => [
    /*getItem('Dashboard', '/dashboard', <Link to="/dashboard"><AppstoreOutlined /></Link>),*/
    getItem('Projects', '/projects', <Link to="/projects"><FolderOpenOutlined /></Link>),
   /*  getItem('Calendar', '/calendar', <Link to="/calendar"><CalendarOutlined /></Link>),
    getItem('Stats', 'sub1', <BarChartOutlined />, [
        getItem('Reports 1', '4'),
        getItem('Reports 2', '5'),
        getItem('Reports 3', '6'),
    ]),
    getItem('Comments', '7', <CommentOutlined />),
    getItem('Notifications', '8', <BellOutlined />), */
    userProfile&&getItem('Logout', '/logout', <a onClick={logOut}><LogoutOutlined /></a>),

];




const SideMenu = () => {
    const {userProfile} = useSelector((state: RootState)=> state.user)
    const logOut = useLogout()

    // Obtiene la ubicación actual desde React Router DOM
    const location = useLocation();
    // Define las rutas correspondientes a cada MenuItem
    const menuItems = getMenuItems({userProfile, logOut})
    const menuItemsKeys =  menuItems.map((item)=>item?.key?.toString())//
    
    // Encuentra la ruta seleccionada actual
    const selectedKey = menuItemsKeys.find((route) =>
        location.pathname.startsWith(route?? "/")
    );


    return <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={menuItems} selectedKeys={[selectedKey??"/"]} />
}

export default SideMenu;