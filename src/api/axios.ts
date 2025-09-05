import axios from "axios";
import { API_URL } from "@/lib/constants";
import { store } from "@/store";



const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { "x-client-type": "web" },
});


// Queue for refresh
let isRefreshing = false;
let failedQueue: ((token: string) => void)[] = [];


const processQueue = (token: string) => {
    failedQueue.forEach((cb) => cb(token));
    failedQueue = [];
};


// Request interceptor: attach token
api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});


// Response interceptor: handle errors
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const { StatusCode, ErrorMessage } = error.response.data;
            return Promise.reject({
                statusCode: StatusCode,
                errorMessage: typeof ErrorMessage === "string" ? ErrorMessage : "Validation failed",
                fieldErrors: typeof ErrorMessage === "object" ? ErrorMessage : null,
            });
        }
        return Promise.reject({ statusCode: 500, message: "Something went wrong" });
    }
);


// Refresh token logic
api.interceptors.response.use(undefined, async (error) => {
    const originalRequest = error.config;


    if (error.statusCode === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise((resolve) => {
                failedQueue.push((token: string) => {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    resolve(api(originalRequest));
                });
            });
        }


        originalRequest._retry = true;
        isRefreshing = true;


        try {
            const { data } = await api.post("/auth/token/refresh");
            store.dispatch({ type: "auth/setAccessToken", payload: data.access_token });
            processQueue(data.access_token);
            return api(originalRequest);
        } finally {
            isRefreshing = false;
        }
    }


    return Promise.reject(error);
});


export default api;


