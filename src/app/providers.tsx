"use client";

import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import api from "@/api/axios";

import { Provider } from "react-redux";
import { store } from "@/store";
import { clearAuth, setAccessToken, setUser } from "@/slices/auth";


export function Providers({ children }: { children: React.ReactNode }) {

    useEffect(() => {

        const initAuth = async () => {
            try {
                const { data } = await api.post("/auth/token/refresh");

                const { access_token, user } = data.Result;

                store.dispatch(setAccessToken(access_token));
                store.dispatch(setUser(user));

            } catch (err) {
                store.dispatch(clearAuth());
            }
        };

        initAuth();


    }, []);



    const [queryClient] = useState(() =>
        new QueryClient({
            defaultOptions: {
                queries: { retry: 1, refetchOnWindowFocus: false },
                mutations: { retry: 0 },
            },
        })
    );

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Provider>
    );
}
