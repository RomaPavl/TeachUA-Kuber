import { useContext, useEffect } from 'react'
import {fetchRequest, authRequest} from '../service/FetchRequest'
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import { saveTokens, deleteUserStorage, getRefreshToken } from "../service/StorageService";
import { BASE_URL } from "../service/config/ApiConfig";


/**
 * This component was created to get access to AuthContext and History
 * inside axios response interceptor.
 * Additional authRequest instance of axios is used to avoid unwanted 
 * requests on autentiacation an refreshig token. (as they also can return 401)
 */
const WithAxios = ({ children }) => {
    const {setUser, setShowLogin} = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        const interceptor = fetchRequest.interceptors.response.use(
            response => response,
            async (error) => {
                const originalConfig = error.config;
                if (error.response) {
                    if (error.response.status === 401 && !originalConfig._retry) {
                        originalConfig._retry = true;
                        try {
                            const { data: tokens } = await authRequest.post(BASE_URL + "/api/token/refresh", {
                                refreshToken: getRefreshToken(),
                            });
                            const { accessToken, refreshToken } = tokens;
                            saveTokens(accessToken, refreshToken);
                            return fetchRequest(originalConfig);
                        } catch (refreshError) {
                            deleteUserStorage();
                            setUser({urlLogo: ''});
                            setShowLogin(true);
                            history.push("/");
                            return Promise.reject(refreshError);
                        }
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            fetchRequest.interceptors.response.eject(interceptor);
        };
    }, [setUser, setShowLogin, history]);

    return children
}

export default WithAxios