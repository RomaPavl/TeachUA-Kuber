import React, {useEffect, useState, useMemo} from 'react';
import {Content} from "antd/es/layout/layout";
import {Input, Select, Spin, List} from 'antd';
import {getUserId} from "../../../../service/StorageService";
import {getUserApplications} from "../../../../service/ClubRegistrationService";
import {getUserAndChildrenApplications} from "../../../../service/ChallengeRegistrationService";
import UserClubApplication from "./club/UserClubApplication";
import "./css/Registration.css";
import {useCancelClubRegistration} from "./hooks/club/useCancelClubRegistration"
import {useCancelChallengeRegistration} from "./hooks/challenge/useCancelChallengeRegistration"
import UserChallengeApplication from "./challenge/UserChallengeApplication";

const {Option} = Select;

const UserApplicationsPage = () => {
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);
    const [displayedApplications, setDisplayedApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChild, setSelectedChild] = useState("default");
    const [selectedStatus, setSelectedStatus] = useState("default");
    const [selectedType, setSelectedType] = useState("default");
    const [childNames, setChildNames] = useState([]);
    const cancelApplication = useCancelClubRegistration(applications, setApplications);
    const cancelChallengeApplication = useCancelChallengeRegistration(applications, setApplications);

    useEffect(() => {
        const loadApplications = async () => {
            try {
                const responseClub = await getUserApplications(getUserId());
                const responseChallenge = await getUserAndChildrenApplications(getUserId());
                const combinedList = responseClub.concat(responseChallenge);
                setApplications(combinedList);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load applications', error);
                setLoading(false);
            }
        };

        loadApplications();
    }, []);

    useEffect(() => {
        const uniqueChildNames = Array.from(new Set(applications
            .filter(app => app.child != null)
            .map(app => `${app.child.firstName} ${app.child.lastName}`)));
        setChildNames(uniqueChildNames);
    }, [applications]);

    const onChildChange = (childName) => {
        setSelectedChild(childName);
    };

    const onStatusChange = (status) => {
        setSelectedStatus(status);
    };
    const onTypeChange = (status) => {
        setSelectedType(status);
    };
    useMemo(() => {
        let displayedApplications = [...applications];

        if (selectedChild !== "default") {
            displayedApplications = displayedApplications.filter(app =>
                app.child != null && `${app.child.firstName} ${app.child.lastName}` === selectedChild
            );
        }

        if (selectedStatus !== "default") {
            displayedApplications = displayedApplications.filter(app => {
                if (selectedStatus === "Схвалено") return app.active && app.approved;
                if (selectedStatus === "Скасовано") return !app.active;
                if (selectedStatus === "На розгляді") return app.active && !app.approved;
                return true;
            });
        }
        if (selectedType !== "default") {
            displayedApplications = displayedApplications.filter(app => {
                if (selectedType === "Гуртки") return app.hasOwnProperty('club');
                if (selectedType === "Челенджі") return app.hasOwnProperty('challenge');
                return true;
            });
        }
        if (searchTerm !== "") {
            displayedApplications = displayedApplications.filter(app => {
                const userName = app.user ? `${app.user.firstName} ${app.user.lastName}`.toLowerCase() : '';
                const childName = app.child ? `${app.child.firstName} ${app.child.lastName}`.toLowerCase() : '';
                let placeName;
                app.challenge ?
                    placeName = app.challenge.name.toLowerCase() : placeName = app.club.name.toLowerCase()


                return (
                    placeName.includes(searchTerm.toLowerCase()) ||
                    userName.includes(searchTerm.toLowerCase()) ||
                    childName.includes(searchTerm.toLowerCase())
                );
            });
        }
        setDisplayedApplications(displayedApplications);
    }, [selectedChild, selectedStatus, selectedType, searchTerm, applications]);

    return (
        <Content className="registrationsContent">
            <div className="contentBox">
                <div className="contentTitle">
                    Заявки на реєстрацію
                </div>

                <div className="searchAndFilter">
                    <Input
                        className="searchBox"
                        placeholder="Пошук..."
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Select
                        defaultValue="default"
                        className="filterSelectStatuses"
                        onChange={onStatusChange}
                        dropdownMatchSelectWidth={false}
                    >
                        <Option value="default">Всі статуси</Option>
                        <Option value="Схвалено">Схвалено</Option>
                        <Option value="Скасовано">Скасовано</Option>
                        <Option value="На розгляді">На розгляді</Option>
                    </Select>
                    <Select
                        defaultValue="default"
                        className="filterSelectStatuses"
                        onChange={onTypeChange}
                        dropdownMatchSelectWidth={false}
                    >
                        <Option value="default">Всі заявки</Option>
                        <Option value="Гуртки">Гуртки</Option>
                        <Option value="Челенджі">Челенджі</Option>
                    </Select>
                    <Select
                        defaultValue="default"
                        className="filterSelectRight"
                        onChange={onChildChange}
                        dropdownMatchSelectWidth={false}
                    >
                        <Option value="default">Всі діти</Option>
                        {childNames.map((name) => (
                            <Option value={name} key={name}>{name}</Option>
                        ))}
                    </Select>
                </div>

                <div className="registrations">
                    {loading ? (
                        <Spin size="large"/>
                    ) : (
                        <List
                            className="registrations"
                            itemLayout="horizontal"
                            split={false}
                            locale={{
                                emptyText: applications.length === 0
                                    ? <div className="noRegistrations">Немає надісланих заявок</div>
                                    : <div className="noRegistrations">Нічого не знайдено</div>
                            }}
                            dataSource={displayedApplications}
                            pagination={{
                                hideOnSinglePage: true,
                                defaultPageSize: 6,
                                className: "user-content-pagination"
                            }}
                            renderItem={(application) => (
                                application.challenge ?
                                    (<UserChallengeApplication
                                            application={application}
                                            cancelApplication={cancelChallengeApplication}
                                            key={application.id}
                                        />
                                    ) : (
                                        <UserClubApplication
                                            application={application}
                                            cancelApplication={cancelApplication}
                                            key={application.id}
                                        />)
                            )}
                        />
                    )}
                </div>
            </div>
        </Content>
    )
        ;
};

export default UserApplicationsPage;