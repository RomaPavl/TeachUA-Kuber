import {useState, useEffect} from 'react';

export const useDisplayedRegistrations = (selectedClub, selectedType, searchTerm, challengeRegistrations, clubRegistrations, isAll, selectedStatus) => {
    const [displayedRegistrations, setDisplayedRegistrations] = useState([]);

    const filterRegistrationsByClub = (registrations, selectedClub, type) => {
        if (selectedClub === "all" || type === "challenge") {
            return registrations;
        }

        return registrations.filter(reg => reg?.club?.name === selectedClub);
    };

    const filterRegistrationsByStatus = (registrations, selectedStatus, isAll) => {
        if (!isAll || selectedStatus === "all") {
            return registrations;
        }

        return registrations.filter(reg => {
            switch (selectedStatus) {
                case "approved":
                    return reg.active && reg.approved;
                case "rejected":
                    return !reg.active;
                case "under_review":
                    return reg.active && !reg.approved;
                default:
                    return true;
            }
        });
    };

    const filterRegistrationsBySearchTerm = (registrations, searchTerm) => {
        if (searchTerm === "") {
            return registrations;
        }

        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return registrations.filter(reg => {
            const userName = reg.user ? `${reg.user.firstName} ${reg.user.lastName}`.toLowerCase() : '';
            const childName = reg.child ? `${reg.child.firstName} ${reg.child.lastName}`.toLowerCase() : '';
            const typeName = reg?.club?.name.toLowerCase() ?? reg?.challenge?.name.toLowerCase() ?? '';

            return (
                typeName.includes(lowerCaseSearchTerm) ||
                userName.includes(lowerCaseSearchTerm) ||
                childName.includes(lowerCaseSearchTerm)
            );
        });
    };
    const filterRegistrationsByType = (registrations, type) => {
        if (type === "all") {
            return registrations;
        }

        return registrations.filter(reg => {
            switch (type) {
                case "challenge":
                    return reg.hasOwnProperty("challenge");
                case "club":
                    return reg.hasOwnProperty("club");
                default:
                    return true;
            }
        });
    };

    useEffect(() => {
        let updatedRegistrations = [...challengeRegistrations, ...clubRegistrations];

        updatedRegistrations = filterRegistrationsByClub(updatedRegistrations, selectedClub, selectedType);
        updatedRegistrations = filterRegistrationsByStatus(updatedRegistrations, selectedStatus, isAll);
        updatedRegistrations = filterRegistrationsBySearchTerm(updatedRegistrations, searchTerm);
        updatedRegistrations = filterRegistrationsByType(updatedRegistrations, selectedType);

        setDisplayedRegistrations(updatedRegistrations);
    }, [selectedClub, selectedType, searchTerm, challengeRegistrations, clubRegistrations, isAll, selectedStatus]);

    return displayedRegistrations;
}