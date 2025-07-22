import React, {useState} from 'react';
import {useClubRegistrations} from './hooks/club/useClubRegistrations';
import {useChallengeRegistrations} from './hooks/challenge/useChallengeRegistrations';
import {useClubNames} from './hooks/club/useClubNames';
import {useDisplayedRegistrations} from './hooks/useDisplayedRegistrations';
import {Content} from "antd/es/layout/layout";
import {getUserId} from "../../../../service/StorageService";
import "./css/Registration.css";
import Title from './components/Title';
import Filters from './components/Filters';
import RegistrationsList from './components/RegistrationsList';
import {useHistory, useLocation} from 'react-router-dom';


const ManagerRegistrationPage = () => {
    const history = useHistory();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(true);
    const [isAll, setIsAll] = useState(queryParams.get('all') === 'true');
    const [selectedClub, setSelectedClub] = useState(queryParams.get('clubName') || "all");
    const [selectedStatus, setSelectedStatus] = useState(queryParams.get('status') || "all");
    const [selectedType, setSelectedType] = useState(queryParams.get('type') || "all");
    const [clubRegistrations, updateClubRegistrations, setClubRegistrations] = useClubRegistrations(getUserId(), setLoading, isAll);
    const [challengeRegistrations, updateChallengeRegistrations, setChallengeRegistrations] = useChallengeRegistrations(getUserId(), setLoading, isAll);
    const [searchTerm, setSearchTerm] = useState("");
    const clubNames = useClubNames(clubRegistrations);
    const displayedRegistrations = useDisplayedRegistrations(
        selectedClub,
        selectedType,
        searchTerm,
        challengeRegistrations,
        clubRegistrations,
        isAll,
        selectedStatus
    );

    const onClubChange = (clubName) => {
        setSelectedClub(clubName);
        queryParams.set('all', isAll ? 'true' : 'false');
        queryParams.set('clubName', clubName);
        if (isAll) {
            queryParams.set('status', selectedStatus);
        } else {
            queryParams.delete('status');
        }
        history.push({
            pathname: location.pathname,
            search: queryParams.toString()
        });
    };
    const onTypeChange = (type) => {
        setSelectedType(type);
        queryParams.set('all', isAll ? 'true' : 'false');
        queryParams.set('type', type);
        if (type !== "club") {
            queryParams.delete('clubName');
            setSelectedClub("all")
        }
        queryParams.delete('clubName');
        if (isAll) {
            queryParams.set('status', selectedStatus);
        } else {
            queryParams.delete('status');
        }
        history.push({
            pathname: location.pathname,
            search: queryParams.toString()
        });
    };
    const onStatusChange = (status) => {
        setSelectedStatus(status);
        queryParams.set('all', isAll ? 'true' : 'false');
        queryParams.set('clubName', selectedClub);
        queryParams.set('status', status);
        history.push({
            pathname: location.pathname,
            search: queryParams.toString()
        });
    };

    const setIsAllAndUpdateURL = (newIsAll) => {
        setIsAll(newIsAll);
        queryParams.set('all', newIsAll ? 'true' : 'false');
        queryParams.set('clubName', selectedClub);
        if (newIsAll) {
            queryParams.set('status', selectedStatus);
        } else {
            queryParams.delete('status');
        }
        history.push({
            pathname: location.pathname,
            search: queryParams.toString()
        });
    };


    return (
        <Content className="registrationsContent">
            <div className="contentBox">
                <Title isAll={isAll} setIsAll={setIsAllAndUpdateURL}/>
                <Filters
                    isAll={isAll}
                    onClubChange={onClubChange}
                    onStatusChange={onStatusChange}
                    onTypeChange={onTypeChange}
                    selectedType={selectedType}
                    setSearchTerm={setSearchTerm}
                    clubNames={clubNames}
                    selectedStatus={selectedStatus}
                    selectedClub={selectedClub}
                />
                <RegistrationsList
                    loading={loading}
                    clubRegistrations={clubRegistrations}
                    setClubRegistrations={setClubRegistrations}
                    updateClubRegistrations={updateClubRegistrations}
                    challengeRegistrations={challengeRegistrations}
                    setChallengeRegistrations={setChallengeRegistrations}
                    updateChallengeRegistrations={updateChallengeRegistrations}
                    displayedRegistrations={displayedRegistrations}
                    isAll={isAll}
                />
            </div>
        </Content>
    );
};

export default ManagerRegistrationPage;