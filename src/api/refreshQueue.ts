type QueueItem = {
    resolve: (token: string) => void;
    reject: (err: any) => void;
    originalRequest?: any;
}

let isRefreshing = false;
let queue: QueueItem[] = [];

export const startRefreshing = () => {
    isRefreshing = true;
};

export const stopRefreshing = () => {
    isRefreshing = false;
};

export const getRefreshingState = () => isRefreshing;

export const addToQueue = (item: QueueItem) => {
    queue.push(item);
};

export const processQueue = (error: any, token: string | null) => {
    queue.forEach((item) => {
        if (error) {
            item.reject(error);
        } else if (token) {
            if (item.originalRequest) {
                item.originalRequest.headers = {
                    ...item.originalRequest.headers,
                    Authorization: `Bearer ${token}`,
                };
                item.resolve(token);
            } else {
                item.resolve(token);
            }
        }
    });

    queue = [];
};
