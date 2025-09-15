import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_URL } from "@/lib/constants";
import { getAccessToken } from "@/lib/auth";
import { refreshToken as fetchNewToken } from "./refreshToken";
import { store } from "@/store";


if (!API_URL) throw new Error("API_URL is not defined");

// -------------------- Axios Instance --------------------
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { "x-client-type": "web" },
});

// -------------------- Refresh Queue --------------------
let isRefreshing = false;
let failedQueue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
    failedQueue.forEach((cb) => cb(token));
    failedQueue = [];
};

// -------------------- Refresh Token Helper --------------------
async function refreshToken(): Promise<string> {
    const newToken = await fetchNewToken();
    processQueue(newToken);
    return newToken;
}

// -------------------- Request Interceptor --------------------
api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

// -------------------- Response Interceptor --------------------
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<any, any>) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (!error.response) {
            return Promise.reject({ statusCode: 500, errorMessage: "Network error" });
        }

        const { StatusCode, ErrorMessage } = error.response.data || {};
        const status = StatusCode || error.response.status;


        // -------------------- Refresh Token Logic --------------------
        // Only refresh token for authenticated requests
        const skipRefresh = ["/auth/token/refresh", "/auth/login", "/auth/register"];
        const shouldRefresh =
            status === 401 && !originalRequest._retry && !skipRefresh.some((path) => originalRequest.url?.includes(path));

        if (shouldRefresh) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    failedQueue.push((token: string) => {
                        if (originalRequest.headers) {
                            originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        }
                        resolve(api(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await refreshToken();
                if (originalRequest.headers) {
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                }
                return api(originalRequest);
            } catch (err) {
                store.dispatch({ type: "auth/logout" });
                window.location.href = "/login";
                return Promise.reject({
                    statusCode: 401,
                    errorMessage: "Session expired. Please log in again.",
                });
            } finally {
                isRefreshing = false;
            }
        }

        // -------------------- Standardized Error --------------------
        return Promise.reject({
            statusCode: status,
            errorMessage: typeof ErrorMessage === "string" ? ErrorMessage : null,
            fieldErrors: typeof ErrorMessage === "object" ? ErrorMessage : null,
        });
    }
);

export default api;