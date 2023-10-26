import { GoogleLogin, GoogleCredentialResponse } from "@react-oauth/google";
import { useEffect, useState } from "react";
import logo from '../../assets/react.svg'
import jwtDecode from "jwt-decode";


import { useGetPersonByIdQuery, useGetPersonQuery } from "../../services/apiPersonSlice";
import { Col, Image, Layout, Row, Space, theme, message, App } from "antd";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../redux/userSlice";


const Login = ({ redirect = true }) => {
    const { data: loggedUser } = useGetPersonByIdQuery(sessionStorage.getItem('userId'), { skip: sessionStorage.getItem('userId') === null })
    const [profile, setProfile] = useState({ email: '' } as any)
    const { data, isSuccess } = useGetPersonQuery(profile.email, { skip: profile.email === '' })
    const { message: outMessage } = App.useApp()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const googleLogOut = useLogout()
    const { token } = theme.useToken()
    const { isLogged } = useAuth()
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'processing';
    const responseMessage = (response: GoogleCredentialResponse) => {
        setProfile(jwtDecode(response.credential ?? ''))
        messageApi.open({
            key,
            type: 'loading',
            content: 'Logging in',
        })
    };
    const { createSessionAuth } = useAuth()
    useEffect(() => {
        if (profile.name) {
            const person = {
                name: profile.name,
                email: profile.email,
                avatar: profile.picture,
                id: profile.sub,
                acccesJTI: profile.jti
            }

            if (isSuccess) {
                createSessionAuth(person, data)
                    .then((res: any) => {

                        outMessage.success(res.messageText)
                        if (redirect)
                            navigate(`/projects`)
                    })
            }
        }
    }, [profile, data])

    useEffect(() => {
        if (loggedUser && loggedUser[0]) {
            dispatch(setUserProfile(loggedUser[0]))
            if (redirect)
                navigate(`/projects`)
        }
    }, [loggedUser])


    const errorHandler = () => {
        message.error("Login Failed")
    }

    return (

        <Layout  >
            {contextHolder}
            <Layout.Content style={{
                display: "flex",
                background: token.colorBgContainer, padding: "0 24px",
                justifyContent: "center", alignItems: "center",
                height: "100%", flexDirection: "column"
            }}>
                <Row >
                    <Col span={24}>
                        {!isLogged ? <Space direction="vertical" size={"small"} align="center">
                            <Image src={logo} ></Image>
                            <h1 style={{ fontSize: 72, margin: 0 }}>Welcome</h1>
                            <GoogleLogin onSuccess={responseMessage} onError={() => {
                                errorHandler();
                            }} />

                        </Space>
                        : <div><h3>Wait...</h3></div>}
                    </Col>
                </Row>



            </Layout.Content >

        </Layout>
    )
}



export default Login