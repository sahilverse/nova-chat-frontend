import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/slices/auth";
import themeReducer from "@/slices/themeSlice";
import { themeMiddleware } from "./themeMiddleware";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(themeMiddleware);
    },
    devTools: process.env.NODE_ENV !== "production",
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;