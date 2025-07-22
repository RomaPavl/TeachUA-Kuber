import React, {useEffect, useState} from 'react';
import CaretRightOutlined from "@ant-design/icons/lib/icons/CaretRightOutlined";
import {Avatar, Button, Collapse} from "antd";
import "./css/Message.less"
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {CheckCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {updateMessageIsActiveById} from "../../../../service/MessageService";
import {getFormattedDate, getLogo} from "./MessageUtil";
import { DeleteOutlined } from '@ant-design/icons';
import AnswerToMessage from "./AnswerToMessage";

const Message = ({message, onDelete}) => {

    const {Panel} = Collapse;
    const [active, setActive] = useState(message.isActive);
    const [signUpForClubVisible, setSignUpForClubVisible] = useState(false);
    const handleDelete = (event) => {
        event.stopPropagation();
        onDelete(message.id);
    };


    useEffect(() => {
            if (!active) {
                updateMessageIsActiveById(message.id, {isActive: false})
                    .then(response => setActive(response.isActive));
            }
        },
        [active]
    );

    const showReadMessage = (isActive) => {
        if (isActive) return <ExclamationCircleOutlined className="exclamation"/>
        else return <CheckCircleOutlined className="checkCircle"/>
    }

    return (
        <Collapse onChange={() => {
            if (message.isActive) setActive(false);
        }}
                  expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
        >
            <div className="userInfo">
                <Avatar size={36} src={getLogo(message.sender.urlLogo)} icon={<UserOutlined/>}/>
                <div className="userName">
                    {`${message.sender.firstName} ${message.sender.lastName}`}
                </div>
            </div>
            <Panel key={message.id}
                   header={
                       <div>
                           <div>
                               {message.club.name}
                           </div>
                       </div>
                   }
                   extra={
                       <div className="extra">
                           <div className="date">
                               {message.date ? getFormattedDate(message.date) : ''}
                           </div>
                           {showReadMessage(active)}
                           <DeleteOutlined className="deleteButton" onClick={handleDelete} />
                       </div>
                   }

            >
                <div>
                    {message.text}
                    <div className="apply-box">
                        <Button className="flooded-button apply-button"
                                onClick={() => setSignUpForClubVisible(true)}
                        >
                            Відповісти
                        </Button>
                        <AnswerToMessage isShowing={signUpForClubVisible}
                                         setShowing={setSignUpForClubVisible}
                                         message={message}
                        />
                    </div>
                </div>
            </Panel>
        </Collapse>
    );
};

export default Message;