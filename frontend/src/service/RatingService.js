import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const updateRating = async () => {
    await fetchRequest.patch(BASE_URL + "/api/clubs/rating").then((response) => {
        return response.data
    }).catch((error) => {
    });
    await fetchRequest.patch(BASE_URL + "/api/centers/rating").then((response) => {
        return response.data
    }).catch((error) => {
    });
};