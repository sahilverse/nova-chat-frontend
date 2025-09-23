"use client";

import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import api from "@/api/axios";

import { Provider } from "react-redux";
import { store } from "@/store";
import { setAccessToken, setUser } from "@/slices/auth";
import { startRefreshing, stopRefreshing, processQueue } from "@/api/refreshQueue";

import { socketInstance } from "@/lib/socket";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";


interface ProvidersProps {
    children: React.ReactNode;
    token?: boolean;
}

export function Providers({ children, token }: ProvidersProps) {
    const [authReady, setAuthReady] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const initAuth = async () => {
            if (!token) {
                setAuthReady(true);
                return;
            }

            startRefreshing();
            try {
                const { data } = await api.post("/auth/token/refresh");
                const { access_token, user } = data.Result;

                socketInstance.connect(access_token);
                store.dispatch(setAccessToken(access_token));
                store.dispatch(setUser(user));
                processQueue(null, access_token);
                router.replace("/chat");
            } catch (err) {
                processQueue(err, null);
                logout();
            } finally {
                stopRefreshing();
                setAuthReady(true);
            }
        };

        initAuth();
    }, [router, token]);

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
