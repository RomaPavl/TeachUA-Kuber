import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const getVersion = async () => {
    return await fetchRequest.get(BASE_URL + "/api/version").then((response) => {
        return response.data
    }).catch((error) => {
    });
};