import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const postClubRegistration = async (clubRegistrationRequest) => {
    return await fetchRequest
        .post(BASE_URL + "/api/club-registration", clubRegistrationRequest)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const postUserClubRegistration = async (userClubRegistrationRequest) => {
    return await fetchRequest
        .post(BASE_URL + "/api/club-registration/user", userClubRegistrationRequest)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getUnapprovedClubRegistrations = async (managerId) => {
    return await fetchRequest
        .get(`${BASE_URL}/api/club-registration/unapproved/${managerId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const approveClubRegistration = async (clubRegistrationId) => {
    return await fetchRequest
        .patch(`${BASE_URL}/api/club-registration/approve/${clubRegistrationId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getChildren = async (clubId) => {
    try {
        return await fetchRequest.get(`${BASE_URL}/api/club-registration/user-children/${clubId}`);
    } catch (error) {
        return error.response;
    }
};

export const isUserAlreadyRegistered = async (clubId, userId) => {
    try {
        const response = await fetchRequest.get(`${BASE_URL}/api/club-registration/${clubId}/${userId}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getUserApplications = async (userId) => {
    return await fetchRequest
        .get(`${BASE_URL}/api/club-registration/user-applications/${userId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const cancelClubRegistration = async (clubRegistrationId) => {
    return await fetchRequest
        .patch(`${BASE_URL}/api/club-registration/cancel/${clubRegistrationId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getAllClubRegistrations = async (managerId) => {
    return await fetchRequest
        .get(`${BASE_URL}/api/club-registration/${managerId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};