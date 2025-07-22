import { useState, useEffect } from 'react';
import { getUnapprovedClubRegistrations, getAllClubRegistrations } from "../../../../../../service/ClubRegistrationService";

export const useClubRegistrations = (userId, setLoading, isAll) => {
    const [clubRegistrations, setClubRegistrations] = useState([]);

    useEffect(() => {
        const loadRegistrations = async () => {
            try {
                let response;
                if (!isAll) {
                    response = await getUnapprovedClubRegistrations(userId);
                } else {
                    response = await getAllClubRegistrations(userId);
                }
                setClubRegistrations(response);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load registrations', error);
                setLoading(false);
            }
        };

        loadRegistrations();
    }, [isAll]);

    const updateClubRegistrations = (clubRegistrationId) => {
        setClubRegistrations(clubRegistrations.filter(reg => reg.hasOwnProperty("club") && reg.id !== clubRegistrationId));
    };

    return [clubRegistrations, updateClubRegistrations, setClubRegistrations];
}