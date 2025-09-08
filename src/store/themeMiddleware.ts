import { Middleware } from "@reduxjs/toolkit";
import { setTheme } from "@/slices/themeSlice";

export const themeMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    if (setTheme.match(action)) {
        if (typeof window !== "undefined") {
            localStorage.setItem("nova-theme", action.payload);
        }
    }

    return result;
};
