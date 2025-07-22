import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getChallengeProfile = (id) => {
    return fetchRequest.get(BASE_URL + "/api/challenge/" + id)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response;
        });
};

export const getActiveChallengesPreviews = () => {
    return fetchRequest.get(BASE_URL + "/api/challenges?active=true")
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response
        });
};

export const getTaskProfile = (id) => {
    return fetchRequest.get(BASE_URL + "/api/challenge/task/" + id)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response;
        })
};

export const createChallenge = async (data) => {
    return await fetchRequest
        .post(BASE_URL + "/api/challenge", {
            name: data.name,
            description: data.description,
            title: data.title,
            picture: data.picture && data.picture.file.response,
            sortNumber: data.sortNumber
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getAllChallenges = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/challenges")
        .then((response) => {
            return response.data;
        });
};

export const getChallengeById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/challenge/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error);
        return error.response.data
    });
};

export const updateChallenge = async (data, id) => {
    return await fetchRequest
        .put(BASE_URL + "/api/challenge/" + id, {
            name: data.name,
            title: data.title,
            description: data.description,
            picture: data.picture,
            sortNumber: data.sortNumber,
            isActive: data.isActive,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateChallengePreview = async (data, id) => {
    return await fetchRequest
        .patch(BASE_URL + "/api/challenge/" + id, {
            name: data.name,
            sortNumber: data.sortNumber,
            title: data.title,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};


export const deleteChallenge = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/challenge/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateChallengeStartDate = async (data, id) => {
    return await fetchRequest
        .put(BASE_URL + "/api/challenge/" + id + "/start/date", {
            startDate: data.startDate
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error.response.data);
            return error.response.data;
        });
};
export const cloneChallenge = async (id) => {
    return await fetchRequest
        .put(BASE_URL + "/api/challenge/" + id + "/clone")
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error.response.data);
            return error.response.data;
        });
};
