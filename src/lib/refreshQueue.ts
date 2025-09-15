let isRefreshing = false;
let failedQueue: {
    resolve: (value: any) => void;
    reject: (err: any) => void;
    originalRequest: any;
}[] = [];

export const startRefreshing = () => {
    isRefreshing = true;
};

export const stopRefreshing = () => {
    isRefreshing = false;
};

export const addToQueue = (item: {
    resolve: (value: any) => void;
    reject: (err: any) => void;
    originalRequest: any;
}) => {
    failedQueue.push(item);
};

export const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject, originalRequest }) => {
        if (token && originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(originalRequest);
        } else {
            reject(error);
        }
    });
    failedQueue = [];
};

export const getRefreshingState = () => isRefreshing;
