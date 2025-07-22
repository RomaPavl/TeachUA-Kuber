import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";

export const addStation = async (data) => {
    return await fetchRequest
        .post(BASE_URL + "/api/station", {
            name: data.name,
            cityName: data.cityName,
            districtName:data.districtName,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const updateStationById = async (data) => {
    return await fetchRequest
        .put(BASE_URL + "/api/station/" + data.id, {
            name: data.name,
            cityName: data.cityName,
            districtName: data.districtName
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};
export  const  getStationsByDistrictNameAndCityName  = async (data) =>{
    return await  fetchRequest
        .post(BASE_URL + "/api/district/stations",
            {
                name: data.name,
                cityName: data.cityName,
                districtName: data.districtName
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
}

export const deleteStationById = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/station/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getAllStations = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/stations")
        .then((response) => {
            return response.data;
        });
};

export const getStationsByCity = async (name) => {
    return await fetchRequest
        .get(BASE_URL + "/api/stations/" + name)
        .then((response) => {
            return response.data;
        });
};
