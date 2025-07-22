import React from 'react';
import { Collapse, Button } from 'antd';
import classes from "../css/Registration.module.css";

const { Panel } = Collapse;
const userIcon = `${process.env.PUBLIC_URL}/static/images/user/avatar/user-icon.png`;
const boyIcon = `${process.env.PUBLIC_URL}/static/images/children/boy-icon.png`;
const girlIcon = `${process.env.PUBLIC_URL}/static/images/children/girl-icon.png`;

const UserApplication = ({ application, cancelApplication }) => {


    let labelClass = classes.label;
    let statusClass;
    if (application.active) {
        labelClass += (application.approved ? " " + classes.labelApproved : " " + classes.labelPending);
        statusClass = application.approved ? classes.labelApproved : classes.labelPending;
    } else {
        labelClass += " " + classes.labelCanceled;
        statusClass = classes.labelCanceled;
    }

    let statusMessage;

    if (application.active) {
        if (application.approved) {
            statusMessage = "Схвалено";
        } else {
            statusMessage = "На розгляді";
        }
    } else {
        statusMessage = "Скасовано";
    }

    const panelHeader = application.child
        ? (
            <div className={labelClass}>
                <div className={classes.childDetails}>
                    <img
                        src={application.child.gender === 'MALE' ? boyIcon : girlIcon}
                        alt={application.child.gender === 'MALE' ? 'Boy Icon' : 'Girl Icon'}
                        className={classes.childIcon}
                    />
                    <span>{application.child.firstName} {application.child.lastName}, {application.child.age}р</span>
                </div>
                <span className={classes.typeName}>{application.challenge.name}</span>
                <Button
                    className={classes.cancelButton}
                    onClick={(event) => {
                        event.stopPropagation();
                        cancelApplication(application.id);
                    }}
                    disabled={!application.active || application.approved}
                >
                    Відмінити
                </Button>
            </div>
        )
        : (
            <div className={labelClass}>
                <div className={classes.childDetails}>
                    <img
                        src={userIcon}
                        alt='UserIcon'
                        className={classes.childIcon}
                    />
                    <span className={classes.userDetails}>{application.user.firstName} {application.user.lastName}</span>
                </div>
                <span className={classes.typeName}>{application.challenge.name}</span>
                <Button
                    className={classes.cancelButton}
                    onClick={(event) => {
                        event.stopPropagation();
                        cancelApplication(application.id);
                    }}
                    disabled={!application.active || application.approved}
                >
                    Відмінити
                </Button>
            </div>
        );

    return (
        <Collapse>
            <Panel header={panelHeader}>
                <h3>Коментар: </h3>
                {application.comment.split('\n').map((line, index) => <p key={index}>{line}</p>)}
                <h3 className={statusClass}>
                    {statusMessage}
                </h3>
                <h3>{application.registrationDate}</h3>
            </Panel>
        </Collapse>
    );
};

export default UserApplication;