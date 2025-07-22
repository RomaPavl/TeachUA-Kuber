import React, {useEffect, useMemo, useState} from 'react';
import { Content } from "antd/es/layout/layout";
import { getUserId } from "../../../../service/StorageService";
import "./css/UserMessagesPage.less";
import {
    getMessagesByRecipientId,
    deleteMessageById,
    getNewMessagesByRecipientId
} from "../../../../service/MessageService";
import Message from "./Message";
import {Input, List, Select, Switch} from 'antd';

const UserMessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [showOnlyNew, setShowOnlyNew] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showOnlyNotAnswered, setShowOnlyNotAnswered] = useState(true);



    const newMessages = messages.filter(message => message.isActive) ;
    const newMessagesCount = newMessages.length;
    console.log(messages.filter(message => !message.isAnswered));
    useEffect(() => {
        if (showOnlyNew) {
            getNewMessagesByRecipientId(getUserId()).then(response => setMessages(response));
        }else {
            getMessagesByRecipientId(getUserId()).then(response => setMessages(response));
        }
    }, [showOnlyNew, showOnlyNotAnswered]);

    let filteredMessages;

    if (showOnlyNew === true && showOnlyNotAnswered === true) {
        filteredMessages = messages.filter(message => message.isActive && !message.isAnswered);
    } else if (showOnlyNew === false && showOnlyNotAnswered === true) {
        filteredMessages = messages.filter(message => !message.isAnswered);
    } else if (showOnlyNew === true && showOnlyNotAnswered === false) {
        filteredMessages = messages.filter(message => message.isActive);
    } else {
        filteredMessages = messages;
    }

    useMemo(() => {
        if (searchTerm !== "") {
            filteredMessages = filteredMessages.filter(message => {
                const userName = message.sender.firstName ? `${message.sender.lastName}`.toLowerCase() : '';

                return (
                    userName.includes(searchTerm.toLowerCase()));
            });
        }}, [searchTerm]);

    const handleDeleteMessage = (messageId) => {
        deleteMessageById(messageId)
            .then(() => {
                setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
            })
            .catch((error) => {
            });
    };

    const handleSortChange = (value) => {
        if (value === "default") {
            const sortedByDateAsc = [...messages].sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();
            setMessages(sortedByDateAsc);
        } else {
            const sortedByDateDesc = [...messages].sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();
            setMessages(sortedByDateDesc);
            console.log(showOnlyNew);
        }
    };

    return (
        <Content className="messagesContent">
            <div className="contentBox">
                <div className="contentTitle">Мої повідомлення</div>
                <div className="filterContainer">У вас {newMessagesCount} непрочитані повідомлення</div>

                <div className="messages">
                    <div className="searchAndFilter">
                        <Input
                            className="searchBox"
                            placeholder="Пошук..."
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <Select
                            defaultValue="default"
                            className="filterSelectRight"
                            onChange={handleSortChange}
                            dropdownMatchSelectWidth={false}
                        >
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <Option value="default">Спочатку нові</Option>
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <Option value="За зростанням">Спочатку старі</Option>
                        </Select>
                    </div>
                    <div className="filterContainer">
                        <span>Показати тільки непрочитані повідомлення: </span>
                        <Switch

                            checked={showOnlyNew}
                            onChange={setShowOnlyNew}
                        />
                    </div>
                    <div className="filterContainer">
                        <span>Повідомлення без відповіді: </span>
                        <Switch
                            checked={showOnlyNotAnswered}
                            onChange={setShowOnlyNotAnswered}
                        />
                    </div>

                    <List
                        className="certificates"
                        itemLayout="horizontal"
                        split={false}
                        locale={{
                            emptyText: <div className="noMessages">Повідомлень немає</div>
                        }}
                        dataSource={filteredMessages}
                        pagination={{ hideOnSinglePage: true, defaultPageSize: 7, className: "user-content-pagination" }}
                        renderItem={(message) => (
                            <Message message={message} key={message.id} onDelete={handleDeleteMessage} />
                        )}
                    />
                </div>
            </div>
        </Content>
    );
};

export default UserMessagesPage;