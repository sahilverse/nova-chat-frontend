"use client";

import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import api from "@/api/axios";

import { Provider } from "react-redux";
import { store } from "@/store";
import { clearAuth, setAccessToken, setUser } from "@/slices/auth";
import { startRefreshing, stopRefreshing, processQueue } from "@/lib/refreshQueue";

import { socketInstance } from "@/lib/socket";

export function Providers({ children }: { children: React.ReactNode }) {
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            startRefreshing();
            try {
                const { data } = await api.post("/auth/token/refresh");
                const { access_token, user } = data.Result;

                socketInstance.connect(access_token);
                store.dispatch(setAccessToken(access_token));
                store.dispatch(setUser(user));
                processQueue(null, access_token);
            } catch (err) {
                store.dispatch(clearAuth());
                processQueue(err, null);
            } finally {
                stopRefreshing();
                setAuthReady(true);
            }
        };

        initAuth();
    }, []);

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: { retry: 1, refetchOnWindowFocus: false },
                    mutations: { retry: 0 },
                },
            })
    );

    if (!authReady) return null;

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Provider>
    );
}
