import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const getNumberOfUnsentCertificates = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/certificate/generate")
        .then((response) => {
            return response.data;
        });
};

export const loadDataToDatabase = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/certificate/load-to-db",
        data
    )
        .then((response) => {
            return response.data
        }).catch((error) => {
            return error.response.data
        });
};

export const sendCertificatesScheduler = async () => {
    return await fetchRequest
        .post(BASE_URL + "/api/scheduler")
        .then((response) => {
            return response.data;
        });
};

export const getSentCertificates = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/certificates")
        .then((response) => {
            return response.data;
        });
};

export const getCertificatesByUserName = async (data) => {
    return await fetchRequest
        .get(BASE_URL + "/api/certificate", {
            params: {
                userName: data.userName
            }
        })
        .then((response) => {
            return response.data;
        })
}

export const getCertificatesOfAuthenticatedUser = async () => {
    return await fetchRequest
        .get(BASE_URL + "/api/certificates/my")
        .then((response) => {
            return response.data;
        })
}

export const downloadCertificate = async (id) => {
    return await fetchRequest
        .get(BASE_URL + "/api/certificates/download/" + id, {
            headers: {"content-type": "application/pdf"},
            responseType: "blob"
        })
        .then(response => {
            let url = URL.createObjectURL(response.data);
            let anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "certificate.pdf";
            document.body.append(anchor);
            anchor.style = "dislay: none";
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(url);
            return response
        })
        .catch(async error => {
            return error.response;
        });
}

export const updateCertificateProfile = async (id, data) => {
    return await fetchRequest.put(BASE_URL + "/api/certificates/" + id, {
        userName: data.userName,
        sendToEmail: data.sendToEmail,
        sendStatus: null,
        serialNumber: data.serialNumber,
        updateStatus: data.updateStatus,
        dates: data.dates
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data;
    });
}

export const getValidationResponse = (serialNumber) => {
    return fetchRequest.get(BASE_URL + "/api/certificate/" + serialNumber)
    .then((response) => {
        return response.data;
    }).catch((error) =>{
        return error.response;
    })
};
