import { Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons';
import useAuth from "../../hooks/useAuth";


const UserMenu = () => {

    const { isLogged, userProfile } = useAuth()
    return <>
        <Avatar src={isLogged && <img src={userProfile.avatar} alt="avatar" />}
            icon={!isLogged && <UserOutlined />} />

    </>


}

export default UserMenu