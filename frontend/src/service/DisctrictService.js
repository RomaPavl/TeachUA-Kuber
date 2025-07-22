import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const addDistrict = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/district", {
        name: data.name,
        cityName: data.cityName
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateDistrictById = async (data) => {
    return await fetchRequest.put(BASE_URL + "/api/district/" + data.id, {
        name: data.name,
        cityName: data.cityName
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const deleteDistrictById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/district/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getDistrictsByCityName = async (name) => {
    return await fetchRequest.get(BASE_URL + "/api/districts/" + name).then((response) => {
        return response.data
    });
};

export const getAllDistrict = async () => {
    return await fetchRequest.get(BASE_URL + "/api/districts").then((response) => {
        return response.data
    });
};