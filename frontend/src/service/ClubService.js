import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";
import {replaceCommaToSemicolon} from "../util/CategoryUtil";

import {searchInputData, searchParameters} from "../context/SearchContext";
import {handleDownloadFile} from "../util/FileUtil";
import {UserLoggedIn} from "../service/StorageService";

export const addClub = async (data) => {
    return await fetchRequest
        .post(BASE_URL + "/api/club", {
            categoriesName: data.categories,
            name: data.name,
            ageFrom: data.ageFrom,
            ageTo: data.ageTo,
            isOnline: data.isOnline,
            description: data.description,
            userId: data.userId,
            locations: data.locations,
            urlLogo: data.urlLogo,
            urlBackground: data.urlBackground,
            urlGallery: data.urlGallery,
            contacts: data.contacts,
            isApproved: data.isApproved,
            centerId: data.centerId,
            workTimes: data.workTimes,
        })
        .then((response) => {
            return response.data;
        });
};

export const updateClubById = async (data) => {
    return await fetchRequest
        .put(BASE_URL + "/api/club/" + data.id, {
            id: data.id,
            ageFrom: data.ageFrom,
            ageTo: data.ageTo,
            name: data.name,
            description: data.description,
            urlWeb: data.urlWeb,
            urlLogo: data.urlLogo,
            urlBackground: data.urlBackground,
            urlGallery: data.urlGallery,
            workTimes: data.workTimes,
            categories: data.categories,
            user: data.user,
            center: data.center,
            rating: data.rating,
            locations: data.locations,
            isApproved: data.isApproved,
            isOnline: data.isOnline,
            feedbackCount: data.feedbackCount,
            contacts: data.contacts
        })
        .then((response) => {
            return response.data;
        });
};

export const getClubById = async (id) => {
    return await fetchRequest
        .get(BASE_URL + "/api/club/" + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getClubsWithoutCategories = async (page) => {
    return await fetchRequest
        .get(BASE_URL + "/api/club/clubs-without-categories" + "?page=" + page)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const getClubsByUserId = async (id, page) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/" + id + "?page=" + page)
        .then((response) => {
            return response.data;
        });
};

export const getAllClubsByUserId = async (id) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/user/" + id)
        .then((response) => {
            return response.data;
        });
};

export const getSimilarClubsByCategoryName = async (
    id,
    categoriesName,
    cityName
) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/search/similar", {
            params: {
                id: id,
                categoriesName: replaceCommaToSemicolon(categoriesName),
                cityName: cityName,
            },
        })
        .then((response) => {
            return response.data;
        });
};

export const getClubsByCategoryAndCity = async (mapSearchParameters) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/search/simple", {
            params: {
                cityName: mapSearchParameters.cityName,
                categoryName: mapSearchParameters.categoryName,
            },
        })
        .then((response) => {
            return response.data;
        });
};

export const getClubsByAdvancedSearch = async (
    parameters,
    page,
    sortBy,
    sortPath
) => {
    let age = parameters.age;
    if (age < 2 || age > 18) {
        age = undefined;
    }

    return await fetchRequest
        .get(BASE_URL + "/api/clubs/search/advanced", {
            params: {
                name: parameters.name
                    ? parameters.name
                    : searchInputData.input,
                age: age,
                cityName: parameters.cityName
                    ? parameters.cityName
                    : searchParameters.cityName,
                districtName: parameters.districtName,
                stationName: parameters.stationName,
                categoriesName:
                    parameters.categoriesName &&
                    replaceCommaToSemicolon(parameters.categoriesName),
                isCenter: parameters.isCenter,
                isOnline: parameters.isOnline
                    ? parameters.isOnline.length === 0
                        ? null
                        : true
                    : null,
                sort: `${sortBy},${sortPath}`,
                page: page,
            },
        })
        .then((response) => {
            return response.data;
        });
};

export const getClubsByParameters = async (parameters, userId) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/search", {
            params: {
                clubName: parameters.clubName,
                cityName: parameters.cityName,
                isOnline: parameters.isOnline,
                categoryName: parameters.categoryName,
                page: parameters.page,
                userId: userId
            },
        })
        .then((response) => {
            return response.data;
        });
};

export const getAllClubs = async () => {
    return await fetchRequest.get(BASE_URL + "/api/clubs").then((response) => {
        return response.data;
    });
};

export const getAllClubsByCenterId = async (centerId) => {
    return await fetchRequest.get(BASE_URL + "/api/clubsByCenterId/" + centerId).then((response) => {
        return response.data;
    });
};

export const getClubReport = async (id, fileName) => {
    const response = await fetchRequest.get(BASE_URL + `/api/pdf/club/${id}`,
        {
            method: "get",
            responseType: "blob"
        }
    )
    handleDownloadFile(response.data, fileName, "pdf")
}

export const changeClubOwner = async (userId, clubId) => {
    return await fetchRequest
        .get(BASE_URL + "/api/user/" + userId)
        .then((response) => {
            return fetchRequest
                .patch(BASE_URL + "/api/club/change-owner/" + clubId, {
                    user: {
                        id: response.data.id,
                        email: response.data.email,
                        password: response.data.password,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        phone: response.data.phone,
                        urlLogo: response.data.urlLogo,
                        provider: response.data.provider,
                        providerId: response.data.providerId,
                        status: response.data.status,
                        verificationCode: response.data.verificationCode,
                    },
                })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error.response.data;
                });
        });
};

export const deleteClubById = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/club/" + id)
        .then((response) => {
            return response.data;
        });
};

export const getTopClubsByCity = async (city, amount) => {
    return await fetchRequest
        .get(BASE_URL + "/api/clubs/top/search",{
            params:{
                cityName: city,
                amount: amount
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};
