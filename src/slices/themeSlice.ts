import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
    theme: Theme;
    actualTheme: "light" | "dark";
}

const initialState: ThemeState = {
    theme: localStorage.getItem("nova-theme") as Theme || "system",
    actualTheme: localStorage.getItem("nova-theme") === "dark" ||
        (localStorage.getItem("nova-theme") === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },
        setActualTheme: (state, action: PayloadAction<"light" | "dark">) => {
            state.actualTheme = action.payload;
        },
    },
});

export const { setTheme, setActualTheme } = themeSlice.actions;
export default themeSlice.reducer;
