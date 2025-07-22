import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const postChildrenChallengeRegistration = async (challengeRegistrationRequest) => {
    return await fetchRequest
        .post(BASE_URL + "/api/challenge-registration/children", challengeRegistrationRequest)
        .then((response) => {
            return response.data;
        });
};

export const postUserChallengeRegistration = async (userChallengeRegistrationRequest) => {
    return await fetchRequest
        .post(BASE_URL + "/api/challenge-registration", userChallengeRegistrationRequest)
        .then((response) => {
            return response.data;
        });
};
export const getAllChallengeRegistrationsByManager = async (managerId) => {
    return await fetchRequest
        .get(`${BASE_URL}/api/challenge-registration/${managerId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};
export const getUnapprovedChallengeRegistrations = async (managerId) => {
    return await fetchRequest
        .get(`${BASE_URL}/api/challenge-registration/unapproved/${managerId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};
export const getChildrenForCurrentUserByChallengeId = async (challengeId) => {
    return await fetchRequest
        .get(`${BASE_URL}/api/challenge-registration/user-children/${challengeId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getUserAndChildrenApplications = async (userId) => {
    return await fetchRequest
        .get(`${BASE_URL}/api/challenge-registration/user-applications/${userId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};
export const checkUserAlreadyRegistered = async (challengeId, userId) => {
    return await fetchRequest
        .get(`${BASE_URL}/api/challenge-registration/${challengeId}/${userId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};
export const approveChallengeRegistration = async (challengeRegistrationId) => {
    return await fetchRequest
        .patch(`${BASE_URL}/api/challenge-registration/approve/${challengeRegistrationId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const cancelChallengeRegistration = async (challengeRegistrationId) => {
    return await fetchRequest
        .patch(`${BASE_URL}/api/challenge-registration/cancel/${challengeRegistrationId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};


