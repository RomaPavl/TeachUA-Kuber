import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";

export const getFeedbackListByClubId = async (id, page = 0, size = 5) => {
    return await fetchRequest.get(`${BASE_URL}/api/feedbacks/${id}`, {
        params: {
            page,
            size,
        },
    }).then((response) => {
        return response.data
    });
};

export const createFeedback = async (text, rate, userId, clubId) => {
    return await fetchRequest.post(BASE_URL + "/api/feedback", {
        text: text,
        rate: rate,
        userId: userId,
        clubId: clubId
    }).then((response) => {
        return response.data
    });
};

export const createReply = async (text, parentCommentId, userId) => {
    return await fetchRequest.post(BASE_URL + "/api/feedback/" + parentCommentId + "/reply", {
        text: text,
        userId: userId
    }).then((response) => {
        return response.data;
    });
};