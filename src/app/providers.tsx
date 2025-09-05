"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export function Providers({ children }: { children: React.ReactNode }) {

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
