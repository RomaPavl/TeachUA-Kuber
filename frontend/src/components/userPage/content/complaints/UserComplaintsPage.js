import React, { useEffect, useState, useMemo } from 'react';
import { Content } from "antd/es/layout/layout";
import { getUserId } from "../../../../service/StorageService";
import {
    getComplaintByRecipientId,
    deleteComplaintById,
    getComplaintBySenderId
} from "../../../../service/ComplaintService";
import { List, Checkbox, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Complaint from './Compaint';
import { getRole } from '../../../../service/StorageService';
import './css/Complaint.less';

const UserComplaintsPage = () => {
    const userRole = getRole();
    const [complaints, setComplaints] = useState([]);
    const [showOnlyNew, setShowOnlyNew] = useState(true);
    const [showOnlyWithoutAnswer, setShowOnlyWithoutAnswer] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        setSearchQuery(searchText);
    };

    const toggleShowOnlyNew = () => {
        setShowOnlyNew(!showOnlyNew);
    };

    const toggleShowOnlyWithoutAnswer = () => {
        setShowOnlyWithoutAnswer(!showOnlyWithoutAnswer);
    };

    useEffect(() => {
        if (userRole === 'ROLE_MANAGER') {
            getComplaintByRecipientId(getUserId()).then(response => setComplaints(response));
        }
        else {
            getComplaintBySenderId(getUserId()).then(response => setComplaints(response));
        }
    }, [showOnlyNew, showOnlyWithoutAnswer]);

    const filteredComplaints = useMemo(() => {
        let filtered = complaints;

        if (showOnlyNew) {
            filtered = filtered.filter((complaint) => complaint.isActive);
        }

        if (showOnlyWithoutAnswer) {
            filtered = filtered.filter((complaint) => !complaint.hasAnswer);
        }

        if (searchQuery) {
            filtered = filtered.filter((complaint) => {
                return (
                    complaint.club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    complaint.text.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
        }

        return filtered;
    }, [complaints, showOnlyNew, showOnlyWithoutAnswer, searchQuery]);

    const handleDeleteComplaint = (complaintId) => {
        deleteComplaintById(complaintId)
            .then(() => {
                setComplaints((prevComplaints) => prevComplaints.filter((complaint) => complaint.id !== complaintId));
            })
            .catch((error) => {
            });
    };

    return (
        <Content className="messagesContent">
            <div className="contentBox">
                <div className="contentTitle">Скарги</div>

                <div className="messages">
                    <div className='controlsContainer'>
                        <div className="filtersContainer">
                            <Checkbox checked={showOnlyNew}
                                onChange={toggleShowOnlyNew}>Показати непрочитані скарги </Checkbox>
                            <Checkbox checked={showOnlyWithoutAnswer}
                                onChange={toggleShowOnlyWithoutAnswer}>Показати скарги без відповіді </Checkbox>
                        </div>
                        <div className="searchContainer">
                            <Input
                                className="searchInput"
                                prefix={<SearchOutlined />}
                                placeholder="Шукати скаргу"
                                value={searchText}
                                onChange={handleSearchTextChange}
                                onPressEnter={handleSearch}
                            />
                            <Button className="search-button" type="primary" onClick={handleSearch}>
                                Пошук
                            </Button>
                        </div>
                    </div>

                    <List
                        className="certificates"
                        itemLayout="horizontal"
                        split={false}
                        locale={{
                            emptyText: <div className="noMessages">Скарг немає</div>
                        }}
                        dataSource={filteredComplaints}
                        pagination={{ hideOnSinglePage: true, defaultPageSize: 4, className: "user-content-pagination" }}
                        renderItem={(complaint) => (
                            <Complaint message={complaint} key={complaint.id} userRole={userRole} onDelete={handleDeleteComplaint} />
                        )}
                    />
                </div>
            </div>
        </Content>
    );
};

export default UserComplaintsPage;