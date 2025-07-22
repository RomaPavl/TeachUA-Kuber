import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import classes from "../css/Registration.module.css";

const ActionButtons = ({ registration, statusClass, approveRegistration, cancelRegistration }) => {
    return (
        <div className={classes.buttonContainer}>
            <Button
                className={classes.approveButton}
                onClick={(event) => {
                    event.stopPropagation();
                    approveRegistration(registration.id);
                }}
                disabled={statusClass !== classes.labelPending}
            >
                Підтвердити
            </Button>
            <Button
                className={classes.cancelButton}
                onClick={(event) => {
                    event.stopPropagation();
                    cancelRegistration(registration.id);
                }}
                disabled={statusClass !== classes.labelPending}
            >
                Відмінити
            </Button>
        </div>
    );
}

ActionButtons.propTypes = {
    registration: PropTypes.object.isRequired,
    statusClass: PropTypes.string.isRequired,
    approveRegistration: PropTypes.func.isRequired,
    cancelRegistration: PropTypes.func.isRequired,
};

export default ActionButtons;