import {cancelChallengeRegistration} from "../../../../../../service/ChallengeRegistrationService";
import {message} from "antd";


export const useCancelChallengeRegistration = (applications, setApplications) => {
    return (applicationId) => {
        cancelChallengeRegistration(applicationId)
            .then((response) => {
                const updatedApplications = applications.map(application =>
                    (application.hasOwnProperty("challenge") && application.id === response.id) ? {
                        ...application,
                        active: response.active
                    } : application
                );

                setApplications(updatedApplications);
                message.success("Заявка скасована");
            })
            .catch(err => {
                message.error("Помилка при скасуванні заявки");
                console.error('Failed to cancel registration', err);
            });
    };
};
