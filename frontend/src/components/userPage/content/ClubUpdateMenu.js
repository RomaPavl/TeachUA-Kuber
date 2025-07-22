import React from "react";
import { useHistory, useRouteMatch } from 'react-router-dom';
import {Menu , message} from "antd";
import './css/UserClub.less';
import {deleteClubById} from "../../../service/ClubService";
import EditClubModal from "../../editClub/EditClubModal";

const ClubUpdateMenu = ({ club, reloadAfterChange }) => {
    const history = useHistory();
    const match = useRouteMatch();
    const basePath = match.url.substring(0, match.url.lastIndexOf('/'));

    return (
        <Menu className="update-menu">
            <Menu.Item className="menu-item" key="participants">
                <a
                    onClick={() => {
                        const params = new URLSearchParams({
                            all: 'true',
                            clubName: club.name,
                            status: 'approved',
                        });
                        history.push({
                            pathname: `${basePath}/registrations`,
                            search: params.toString(),
                        });
                    }}
                >
                    Учасники гуртка
                </a>
            </Menu.Item>
            <Menu.Item className="menu-item" key="edit_club">
                <EditClubModal clubId={club.id} reloadAfterChange={reloadAfterChange}/>
            </Menu.Item>
            <Menu.Item className="menu-item" key="delete_club">
                <a onClick={() => {
                    deleteClubById(club.id).then(() => {
                        reloadAfterChange();
                        message.success("Гурток успішно видалено");
                    }).catch(() => message.error("Помилка при видаленні гуртка"));
                }}>Видалити гурток</a>
            </Menu.Item>
        </Menu>
    );
};

export default ClubUpdateMenu;