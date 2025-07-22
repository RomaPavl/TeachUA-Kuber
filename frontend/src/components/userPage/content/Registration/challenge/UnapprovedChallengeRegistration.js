import React from 'react';
import {Collapse, message} from 'antd';
import classes from "../css/Registration.module.css";
import ActionButtons from "../components/ActionButtons";
import {approveChallengeRegistration, cancelChallengeRegistration} from "../../../../../service/ChallengeRegistrationService";

const { Panel } = Collapse;
const userIcon = `${process.env.PUBLIC_URL}/static/images/user/avatar/user-icon.png`;
const boyIcon = `${process.env.PUBLIC_URL}/static/images/children/boy-icon.png`;
const girlIcon = `${process.env.PUBLIC_URL}/static/images/children/girl-icon.png`;

const UnapprovedChallengeRegistration = ({ registration, updateRegistrations }) => {
    const approveRegistration = async (challengeRegistrationId) => {
        try {
            const response = await approveChallengeRegistration(challengeRegistrationId);
            if (response.approved) {
                updateRegistrations(response.id);
            }
            message.success("Реєстрацію підтверджено")
        } catch (error) {
            message.error("Помилка при підтверджені реєстрації")
            console.error('Failed to approve registration', error);
        }
    }

    const cancelAndDeleteRegistration = async (challengeRegistrationId) => {
        try {
            const response = await cancelChallengeRegistration(challengeRegistrationId);
            if (!response.active) {
                updateRegistrations(response.id);
            }
            message.success("Заявка скасована");
        } catch(err) {
            message.error("Помилка при скасуванні заявки");
            console.error('Failed to cancel registration', err);
        }
    }

            const panelHeader = registration.child
        ? (
            <div className={classes.label}>
                <div className={classes.childDetails}>
                    <img
                        src={registration.child.gender === 'MALE' ? boyIcon : girlIcon}
                        alt={registration.child.gender === 'MALE' ? 'Boy Icon' : 'Girl Icon'}
                        className={classes.childIcon}
                    />
                    <span>{registration.child.firstName} {registration.child.lastName}, {registration.child.age}р</span>
                </div>
                <span className={classes.typeName}>{registration.challenge.name}</span>
                <ActionButtons
                    approveRegistration={approveRegistration}
                    statusClass={classes.labelPending}
                    cancelRegistration={cancelAndDeleteRegistration}
                    registration={registration}>
                </ActionButtons>
            </div>
        )
        : (
            <div className={classes.label}>
                <div className={classes.childDetails}>
                    <img
                        src={userIcon}
                        alt='User Icon'
                        className={classes.childIcon}
                    />
                    <span className={classes.userDetails}>{registration.user.firstName} {registration.user.lastName}</span>
                </div>
                <span className={classes.typeName}>{registration.challenge.name}</span>
                <ActionButtons
                    approveRegistration={approveRegistration}
                    statusClass={classes.labelPending}
                    cancelRegistration={cancelAndDeleteRegistration}
                    registration={registration}>
                </ActionButtons>
            </div>
        );

    return (
        <Collapse>
            <Panel key={registration.id} header={panelHeader}>
                {registration.child && registration.child.parent && (
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
                <h3>{registration.registrationDate}</h3>
            </Panel>
        </Collapse>
    );
};

export default UnapprovedChallengeRegistration;