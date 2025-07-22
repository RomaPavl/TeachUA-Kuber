import { useState, useEffect } from 'react';
import { getUnapprovedChallengeRegistrations, getAllChallengeRegistrationsByManager } from "../../../../../../service/ChallengeRegistrationService";

export const useChallengeRegistrations = (userId, setLoading, isAll) => {
    const [challengeRegistrations, setChallengeRegistrations] = useState([]);

    useEffect(() => {
        const loadRegistrations = async () => {
            try {
                let response;
                if (!isAll) {
                    response = await getUnapprovedChallengeRegistrations(userId);
                } else {
                    response = await getAllChallengeRegistrationsByManager(userId);
                }
                setChallengeRegistrations(response);
            } catch (error) {
                console.error('Failed to load registrations', error);
            }finally {
                setLoading(false);
            }
        };

        loadRegistrations();
    }, [isAll]);

    const updateRegistrations = (challengeRegistrationId) => {
        setChallengeRegistrations(challengeRegistrations.filter(reg => reg.id !== challengeRegistrationId));
    };

    return [challengeRegistrations, updateRegistrations, setChallengeRegistrations];
}