import {approveClubRegistration} from "../../../../../../service/ClubRegistrationService";
import {message} from "antd";

export const useApproveClubRegistration = (registrations, setRegistrations) => {
    return (clubRegistrationId) => {
        approveClubRegistration(clubRegistrationId)
            .then((response) => {
                const updatedRegistrations = registrations.map(registration =>
                    registration.id === response.id ? {...registration, approved: response.approved} : registration
                );
                setRegistrations(updatedRegistrations);
                message.success("Реєстрацію підтверджено");
            })
            .catch(error => {
                message.error("Помилка при підтверджені реєстрації");
                console.error('Failed to approve registration', error);
            });
    };
};