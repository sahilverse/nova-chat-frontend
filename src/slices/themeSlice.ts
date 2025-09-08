import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
    theme: Theme;
    actualTheme: "light" | "dark";
}

const initialState: ThemeState = {
    theme: "system",
    actualTheme: "light",
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
