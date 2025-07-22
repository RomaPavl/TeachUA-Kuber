import {cancelClubRegistration} from "../../../../../../service/ClubRegistrationService";
import {message} from "antd";

export const useCancelClubRegistration = (applications, setApplications) => {
    return (applicationId) => {
        cancelClubRegistration(applicationId)
            .then((response) => {
                const updatedApplications = applications.map(application =>
                    (application.hasOwnProperty("club") && application.id === response.id) ? {
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
