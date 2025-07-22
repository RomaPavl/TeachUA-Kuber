import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const postChild = async (childProfile) => {
    return await fetchRequest
        .post(BASE_URL + "/api/child", childProfile)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};