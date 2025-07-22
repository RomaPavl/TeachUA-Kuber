import React, {useEffect, useState} from 'react';
import '../sider/css/Sider.less'
import { MailOutlined, UserOutlined, FileDoneOutlined, CheckOutlined, ExclamationOutlined } from "@ant-design/icons";
import {ConfigProvider, Menu} from "antd";
import { Link, useHistory } from "react-router-dom";
import { getRole } from "../../../service/StorageService"

const MenuSiderComponent = ({ url }) => {
    const userRole = getRole();
    const router = useHistory();
    const [currentKey, setCurrentKey] = useState(router.location.pathname);

    const handleClick = e => {
        setCurrentKey(e.key);
    };

    useEffect(() => {
        return router.listen((location) => {
            setCurrentKey(location.pathname);
        })
    }, [router]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimaryHover: "#fff",
                    colorPrimary: "#fff"
                },
            }}>
        <div className="menu-component">

            <div className="menu-title">Особистий кабінет</div>

            <Menu onClick={handleClick}
                className="sider-profile"
                mode="inline"
                selectedKeys={[currentKey]}
            >
                <Menu.Item className="menu-item"
                    style={{ paddingLeft: 15 }}
                    key={`${url}/page`}
                    icon={<UserOutlined className="icon-user" style={{ fontSize: 20 }} />}
                >
                    <Link to={`${url}/page`}>Профіль</Link>
                </Menu.Item>
                <Menu.Item className="menu-item"
                    style={{ paddingLeft: 15 }}
                    key={`${url}/messages`}
                    icon={<MailOutlined className="icon-message" style={{ fontSize: 20 }} />}
                >
                    <Link to={`${url}/messages`}>Повідомлення</Link>
                </Menu.Item>
                {userRole === 'ROLE_MANAGER' && (
                    <Menu.Item
                        className="menu-item"
                        style={{ paddingLeft: 15 }}
                        key={`${url}/registrations`}
                        icon={<CheckOutlined className="icon-message" style={{ fontSize: 20 }} />}
                    >
                        <Link to={`${url}/registrations`}>Реєстрації</Link>
                    </Menu.Item>
                )}
                {<Menu.Item
                        className="menu-item"
                        style={{ paddingLeft: 15 }}
                        key={`${url}/complaints`}
                        icon={<ExclamationOutlined className="icon-message" style={{ fontSize: 20 }} />}
                    >
                        <Link to={`${url}/complaints`}>Скарги</Link>
                    </Menu.Item>
                }
                {userRole === 'ROLE_USER' && (
                    <Menu.Item
                        className="menu-item"
                        style={{ paddingLeft: 15 }}
                        key={`${url}/applications`}
                        icon={<CheckOutlined className="icon-message" style={{ fontSize: 20 }} />}
                    >
                        <Link to={`${url}/applications`}>Заявки</Link>
                    </Menu.Item>
                )}
                <Menu.Item className="menu-item"
                    style={{ paddingLeft: 15 }}
                    key={`${url}/certificates`}
                    icon={<FileDoneOutlined className="icon-message" style={{ fontSize: 20 }} />}
                >
                    <Link to={`${url}/certificates`}>Сертифікати</Link>
                </Menu.Item>
            </Menu>
        </div>
        </ConfigProvider>
    );
};

export default MenuSiderComponent;
