import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";
import {searchInputData, searchParameters} from "../context/SearchContext";
import {handleDownloadFile} from "../util/FileUtil";



export const getCenterById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/center/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getCenterClubsByCenterId = async (id, page, clubsPerPage) => {
    return await fetchRequest
        .get(BASE_URL + "/api/centers/clubs/" + id + "?size=" + clubsPerPage + "&page=" + page)
        .then((response) => {
            return response.data;
        });
};

export const getAllCenterClubsByCenterId = async (id) => {
    const url = BASE_URL + "/api/clubsByCenterId/" + id;
    return await fetchRequest.get(url)
        .then((response) => {
            return response.data;
        });
};

export const getCentersByUserId = async (id, page) => {
    return await fetchRequest.get(BASE_URL + "/api/centers/" + id + "?page=" + page).then((response) => {
        return response.data
    }).catch((error) => {
        return error.data;
    });
};

export const getAllCenters = async () => {
    return await fetchRequest.get(BASE_URL + "/api/centers").then((response) => {
        return response.data
    });
};

export const getCenterReport = async (id, fileName) => {
    const response = await fetchRequest.get(BASE_URL + `/api/pdf/center/${id}`,
        {
            method: "get",
            responseType: "blob"
        }
    )
    handleDownloadFile(response.data, fileName, "pdf")
}

export const getCentersByAdvancedSearch = async (
    parameters,
    page,
    sortBy,
    sortPath
) => {
    return await fetchRequest.get(BASE_URL + "/api/centers/search/advanced", {
        params: {
            centerName: parameters.centerName ? parameters.centerName : searchInputData.input,
            cityName: parameters.cityName ? parameters.cityName : searchParameters.cityName,
            districtName: parameters.districtName,
            stationName: parameters.stationName,
            sort: `${sortBy},${sortPath}`,
            page: page,
        },
    }).then((response) => {
        return response.data;
    });
}
export const deleteCenterById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/center/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.data;
        })
}


export const addCenter = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/center", {
        name: data.name,
        description: data.description,
        userId: data.userId,
        contacts: data.contacts,
        locations: data.locations,
        urlLogo: data.urlLogo !== undefined ? data.urlLogo.file.response : undefined,
        urlBackgroundPicture: data.urlBackground !== undefined ? data.urlBackground.file.response : undefined,
        clubsId: data.clubs,
    }).then((response) => {
        return response.data
    });
};

export const updateCenter = async (id, data) => {
    return await fetchRequest.put(BASE_URL + "/api/center/" + id, {
        name: data.name,
        description: data.description,
        userId: data.userId,
        contacts: data.contacts,
        locations: data.locations,
        urlLogo: data.urlLogo !== undefined ? data.urlLogo : undefined,
        urlBackgroundPicture: data.urlBackground !== undefined ? data.urlBackground.file.response : undefined,
        clubsId: data.clubs,
    }).then((response) => {
        return response.data
    })


};