import { fetchRequest, authRequest } from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";
import { getRefreshToken } from "./StorageService";

export const resetPassword = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/resetpassword", {
        email: data.email,
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};


export const verifyReset = async (verifyCode) => {
    return await fetchRequest.get(BASE_URL + "/api/verifyreset?code=" + verifyCode)
        .then((response) => {
            return response;
        }).catch((error) => {
            return error.response;
        });
};

export const changePassword = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/verifyreset", {
        id: data.id,
        email: data.email,
        password: data.password,
        verificationCode: data.verificationCode
    }).then((response) => {
        return response.data
    });
};

export const getUserById = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/user/" + id).then((response) => {
        return response.data
    }).catch(async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                await refreshAccessToken();
                const retryResponse = await fetchRequest.get(BASE_URL + "/api/user/" + id).then((response) => {
                    return response.data
                });
                return retryResponse.data;
            } catch (refreshError) {
                return refreshError.response;
            }
        } else {
            return error.response;
        }
    });
};

export const signUp = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        roleName: data.role,
        urlLogo: data.urlLogo && data.urlLogo.file.response
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const signIn = async (data) => {
    return await authRequest.post(BASE_URL + "/api/signin", {
        email: data.email,
        password: data.password
    }).then((response) => {
        return response.data
    });
};

export const refreshAccessToken = async () => {
    return await fetchRequest.post(BASE_URL + "/api/token/refresh", {
        refreshToken: getRefreshToken(),
    }).then((response) => {
        return response.data
    });
}

export const revokeRefreshToken = async () => {
    return await authRequest.post(BASE_URL + "/api/token/revoke", {
        refreshToken: getRefreshToken(),
    }).then((response) => {
        return response.data
    });
}

export const verify = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/verify", {
        id: data.id,
        password: data.currentPassword
    }).then((response) => {
        return response.data
    });
};

export const updateUser = async (data) => {
    return await fetchRequest.put(BASE_URL + "/api/user/" + data.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        roleName: data.roleName,
        urlLogo: data.urlLogo,
        status: data.status
    }).then((response) => {
        return response.data;
    });
};

export const updatePassword = async (data) => {
    return await fetchRequest.patch(BASE_URL + "/api/user/" + data.id, {
        oldPassword: data.currentPassword,
        newPassword: data.password,
        newPasswordVerify: data.password
    }).then((response) => {
        return response.data
    });
};

export const getAllUsers = async () => {
    return await fetchRequest.get(BASE_URL + "/api/users")
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response.data
        })
};

export const getUsersByRole = async (role) => {
    return await fetchRequest.get(BASE_URL + "/api/users/" + role)
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response.data
        });
};

export const deleteUserById = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/user/" + id, {
        id: id
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};