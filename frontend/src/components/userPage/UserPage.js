import React, {useEffect, useContext} from "react";
import {useRouteMatch} from "react-router-dom";
import SiderComponent from "./sider/UserSider";
import UserPageContent from "./content/UserPageContent";
import '../userPage/css/User.less'
import {getUserById} from "../../service/UserService";
import Layout from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {getUserId, deleteUserStorage} from "../../service/StorageService";
import UserMessagesPage from "./content/messages/UserMessagesPage";
import UserCertificatesPage from "./content/certificates/UserCertificatesPage";
import ManagerRegistrationPage from "./content/Registration/ManagerRegistrationPage";
import UserRoute from "../routes/UserRoute";
import {AuthContext} from "../../context/AuthContext";
import UserApplicationsPage from "./content/Registration/UserApplicationsPage";
import UserComplaintsPage from "./content/complaints/UserComplaintsPage";

const UserPage = () => {

    const {user, setUser} = useContext(AuthContext);
    const routeMatch = useRouteMatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getUserById(getUserId()).then(response => {
            setUser(response);
        }).catch(() => {
            deleteUserStorage();
        });
    };

    return (
        <Layout className="user-page" >
            <Sider>
                <SiderComponent url={routeMatch.url} />
            </Sider>

            <UserRoute exact path={`${routeMatch.path}/page`} >
                <UserPageContent />
            </UserRoute>

            <UserRoute exact path={`${routeMatch.path}/messages`} >
                <UserMessagesPage />
            </UserRoute>

            <UserRoute exact path={`${routeMatch.path}/complaints`} >
                <UserComplaintsPage/>
            </UserRoute>

            <UserRoute exact path={`${routeMatch.path}/registrations`}>
                <ManagerRegistrationPage />
            </UserRoute>

            <UserRoute exact path={`${routeMatch.path}/applications`} >
                <UserApplicationsPage />
            </UserRoute>

            <UserRoute exact path={`${routeMatch.path}/certificates`} >
                <UserCertificatesPage />
            </UserRoute>
        </Layout>
    )
}

export default UserPage;
