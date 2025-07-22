import { useState, useEffect } from 'react';

export const useClubNames = (unapprovedRegistrations) => {
    const [clubNames, setClubNames] = useState([]);

    useEffect(() => {
        const uniqueClubNames = Array.from(new Set(unapprovedRegistrations.map(reg => reg.club.name)));
        setClubNames(uniqueClubNames);
    }, [unapprovedRegistrations]);

    return clubNames;
}