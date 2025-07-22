import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const createComplaint = async (text, userId, recipientId,  clubId) => {
    return await fetchRequest.post(BASE_URL + "/api/complaint", {
        text: text,
        userId: userId,
        clubId: clubId,
        recipientId: recipientId,
        isActive: true
    }).then((response) => {
        return response.data
    });
};

export const getComplaintByRecipientId = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/complaints/recipient/" + id)
        .then((response) => {
            return response.data
        });
}

export const getComplaintBySenderId = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/complaints/sender/" + id)
        .then((response) => {
            return response.data
        });
}

export const updateComplaintIsActiveById = async (id, data) => {
    return await fetchRequest.put(BASE_URL + "/api/complaint/isActive/" + id, {
        isActive: data.isActive
    })
        .then((response) => {
            return response.data
        });
}

export const deleteComplaintById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/complaint/" + id)
        .then((response) => {
            return response.data
        });
}

export const updateComplaintAnswerById = async (id, answer) => {
    return await fetchRequest.put(BASE_URL + `/api/complaint/${id}/answer`, {
        answerText: answer
    })
        .then((response) => {
            return response.data
        });
}