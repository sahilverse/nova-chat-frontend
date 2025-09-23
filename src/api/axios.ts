import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_URL } from "@/lib/constants";
import { getAccessToken, logout } from "@/lib/auth";
import { refreshToken } from "./refreshToken";
import {
    startRefreshing,
    stopRefreshing,
    addToQueue,
    processQueue,
    getRefreshingState,
} from "@/api/refreshQueue";

if (!API_URL) throw new Error("API_URL is not defined");

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { "x-client-type": "web" },
});

// attach access token
api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && config.headers) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

// response interceptor 
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any, any>) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (!error.response) return Promise.reject({ statusCode: 500, errorMessage: "Network error" });

        const { StatusCode, ErrorMessage } = error.response.data || {};
        const status = StatusCode || error.response.status;

        const skipRefresh = ["/auth/token/refresh", "/auth/login", "/auth/register"];
        const shouldRefresh =
            status === 401 &&
            !originalRequest._retry &&
            !skipRefresh.some((path) => originalRequest.url?.includes(path));

        if (shouldRefresh) {
            if (getRefreshingState()) {
                return new Promise((resolve, reject) => {
                    addToQueue({
                        resolve: (newToken: string) => {
                            if (originalRequest.headers) {
                                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                            }
                            resolve(api(originalRequest));
                        },
                        reject,
                        originalRequest,
                    });
                });
            }

            originalRequest._retry = true;
            startRefreshing();

            try {
                const newToken = await refreshToken();
                processQueue(null, newToken);
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                logout();
                return Promise.reject({
                    statusCode: 401,
                    errorMessage: "Session expired. Please log in again.",
                });
            } finally {
                stopRefreshing();
            }
        }

        return Promise.reject({
            statusCode: status,
            errorMessage: typeof ErrorMessage === "string" ? ErrorMessage : null,
            fieldErrors: typeof ErrorMessage === "object" ? ErrorMessage : null,
        });
    }
);

export default api;
