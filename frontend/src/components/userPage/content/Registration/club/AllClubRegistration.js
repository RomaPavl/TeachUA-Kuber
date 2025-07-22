import React from 'react';
import {Collapse} from 'antd';
import classes from "../css/Registration.module.css";
import ActionButtons from "../components/ActionButtons";


const {Panel} = Collapse;
const userIcon = `${process.env.PUBLIC_URL}/static/images/user/avatar/user-icon.png`;
const boyIcon = `${process.env.PUBLIC_URL}/static/images/children/boy-icon.png`;
const girlIcon = `${process.env.PUBLIC_URL}/static/images/children/girl-icon.png`;

const AllClubRegistration = ({registration, approveRegistration, cancelRegistration}) => {
    let labelClass = classes.label;
    let statusClass;
    if (registration.active) {
        labelClass += (registration.approved ? " " + classes.labelApproved : " " + classes.labelPending);
        statusClass = registration.approved ? classes.labelApproved : classes.labelPending;
    } else {
        labelClass += " " + classes.labelCanceled;
        statusClass = classes.labelCanceled;
    }

    let statusMessage;

    if (registration.active) {
        if (registration.approved) {
            statusMessage = "Схвалено";
        } else {
            statusMessage = "На розгляді";
        }
    } else {
        statusMessage = "Скасовано";
    }

    const panelHeader = registration.child
        ? (
            <div className={labelClass}>
                <div className={classes.childDetails}>
                    <img
                        src={registration.child.gender === 'MALE' ? boyIcon : girlIcon}
                        alt={registration.child.gender === 'MALE' ? 'Boy Icon' : 'Girl Icon'}
                        className={classes.childIcon}
                    />
                    <span>{registration.child.firstName} {registration.child.lastName}, {registration.child.age}р</span>
                </div>
                <span className={classes.typeName}>{registration.club.name}</span>
                <ActionButtons
                    approveRegistration={approveRegistration}
                    statusClass={statusClass}
                    cancelRegistration={cancelRegistration}
                    registration={registration}>
                </ActionButtons>
            </div>
        )
        : (
            <div className={labelClass}>
                <div className={classes.childDetails}>
                    <img
                        src={userIcon}
                        alt='User Icon'
                        className={classes.childIcon}
                    />
                    <span
                        className={classes.userDetails}>{registration.user.firstName} {registration.user.lastName}</span>
                </div>
                <span className={classes.typeName}>{registration.club.name}</span>
                <ActionButtons
                    approveRegistration={approveRegistration}
                    statusClass={statusClass}
                    cancelRegistration={cancelRegistration}
                    registration={registration}>
                </ActionButtons>
            </div>
        );

    return (
        <Collapse>
            <Panel key={registration.id} header={panelHeader}>
                {registration?.child?.parent && (
                    <>
                        <h3>Хто зареєстрував:</h3>
                        <p>{registration.child.parent.firstName} {registration.child.parent.lastName}, {registration.child.parent.phone}, {registration.child.parent.email}</p>
                    </>
                )}
                {registration.user && (
                    <>
                        <h3>Додаткова інформація:</h3>
                        <p>{registration.user.phone}, {registration.user.email}</p>
                    </>
                )}
                <h3>Коментар: </h3>
                {registration.comment.split('\n').map((line, index) => <p key={index}>{line}</p>)}
                <h3 className={statusClass}>
                    {statusMessage}
                </h3>
                <h3>{registration.registrationDate}</h3>
            </Panel>
        </Collapse>
    );
};

export default AllClubRegistration;