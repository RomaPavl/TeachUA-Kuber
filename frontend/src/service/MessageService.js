import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";

export const createMessage = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/message", {
        text: data.text,
        senderId: data.senderId,
        recipientId: data.recipientId,
        clubId: data.clubId,
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data;
    });
}

export const getMessagesByRecipientId = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/messages/recipient/" + id)
        .then((response) => {
            return response.data
        });
}

export const getNewMessagesByRecipientId = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/messages/recipient-new/" + id)
        .then((response) => {
            return response.data
        });
}


export const updateMessageIsActiveById = async (id, data) => {
    return await fetchRequest.put(BASE_URL + "/api/message/active/" + id, {
        isActive: data.isActive
    }).then((response) => {
        return response.data
    });
}

export const updateMessageIsAnsweredById = async (id, data) => {
    return await fetchRequest.put(BASE_URL + "/api/message/answered/" + id, {
        isAnswered: data.isAnswered
    }).then((response) => {
        return response.data
    });
}


export const deleteMessageById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/message/" + id)
        .then((response) => {
            return response.data
        });
}
